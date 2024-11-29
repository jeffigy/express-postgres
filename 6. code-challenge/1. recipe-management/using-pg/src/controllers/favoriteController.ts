import { Request, Response } from "express";
import { query } from "../utils/db";

export const getFavorites = async (req: Request, res: Response) => {
  const userId = req.user_id;
  const favorites = await query(
    "SELECT * FROM favorites INNER JOIN recipes ON favorites.recipe_id = recipes.recipe_id WHERE favorites.user_id = $1",
    [userId]
  );

  if (favorites.length === 0) {
    res.status(404).json({ message: "No favorites found" });
    return;
  }

  res.json(favorites);
};

export const getFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user_id;
  const favorite = await query(
    "SELECT * FROM favorites INNER JOIN recipes ON favorites.recipe_id = recipes.recipe_id WHERE favorites.favorite_id = $1 AND favorites.user_id = $2",
    [id, userId]
  );

  if (favorite.length === 0) {
    res.status(404).json({ message: "Favorite not found" });
    return;
  }

  res.json(favorite[0]);
};

export const newFavorite = async (req: Request, res: Response) => {
  const { recipeId } = req.body;
  const userId = req.user_id;
  if (!recipeId) {
    res.status(400).json({ message: "Recipe id is required" });
  }

  const foundRecipe = await query(
    "SELECT * FROM recipes WHERE recipe_id = $1",
    [recipeId]
  );

  if (foundRecipe.length === 0) {
    res.status(404).json({ message: "Recipe not found" });
  }

  const newFavorite = await query(
    `INSERT INTO favorites (recipe_id, user_id) VALUES ($1, $2) RETURNING *`,
    [recipeId, userId]
  );

  res.json(newFavorite);
};

export const deleteFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user_id;
  if (!id) {
    res.status(400).json({ message: "Id is required" });
    return;
  }

  const foundFavorite = await query(
    "SELECT * FROM favorites WHERE favorite_id = $1 AND favorites.user_id = $2",
    [id, userId]
  );

  if (!foundFavorite) {
    res.status(404).json({ message: "Favorite not found" });
  }

  await query(
    "DELETE FROM favorites WHERE favorite_id = $1 AND favorites.user_id = $2 RETURNING *",
    [id, userId]
  );

  res.json({ message: "favorite deleted" });
};
