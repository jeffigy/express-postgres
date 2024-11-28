import { Request, Response } from "express";
import { query } from "../utils/db";
import { Recipe } from "../types/recipe";

export const getRecipes = async (req: Request, res: Response) => {
  const recipes = await query("SELECT * FROM recipes");
  if (recipes.length === 0) {
    res.status(404).json({ message: "No recipes found" });
  }

  res.json(recipes);
};

export const getRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  const recipes = await query("SELECT * FROM recipes WHERE id = $1", [id]);
  if (recipes.length === 0) {
    res.status(404).json({ message: "No recipe found" });
  }

  res.json(recipes[0]);
};

export const newRecipe = async (req: Request, res: Response) => {
  const { title, description, ingredients, instructions } = req.body;

  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  const newRecipe = await query(
    `INSERT INTO recipes (title, description, ingredients, instructions) VALUES ($1, $2, $3::jsonb, $4) RETURNING *`,
    [title, description, JSON.stringify(ingredients), instructions]
  );

  res.json(newRecipe);
};

export const updateRecipe = async (req: Request, res: Response) => {
  const { title, description, ingredients, instructions } = req.body;
  const { id } = req.params;

  const recipes = await query("SELECT * FROM recipes WHERE id = $1", [id]);

  if (recipes.length === 0) {
    res.status(404).json({ message: "No recipe found" });
  }

  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  const newRecipe = await query(
    `UPDATE recipes SET title = $1, description = $2, ingredients = $3::jsonb, instructions = $4 WHERE id = $5 RETURNING *`,
    [title, description, JSON.stringify(ingredients), instructions, id]
  );

  res.json(`Recipe ${newRecipe[0].title} updated`);
};

export const deleteRecipe = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "id is required" });
  }

  const existedRecipe = await query(
    "SELECT EXISTS(SELECT 1 FROM recipes WHERE id = $1)",
    [id]
  );

  if (!existedRecipe[0].exists) {
    res.status(404).json({ message: "Recipe not found" });
  }

  const deletedRecipe: Recipe[] = await query(
    "DELETE FROM recipes WHERE id = $1 RETURNING *",
    [id]
  );

  res.json({ message: `Recipe ${deletedRecipe[0].title} deleted` });
};
