import { Router } from "express";
import {
  deleteRecipe,
  getRecipe,
  getRecipes,
  newRecipe,
  updateRecipe,
} from "../controllers/recipeController";
import verifyJWT from "../middlewares/verifyJWT";
const recipeRoute = Router();

recipeRoute.use(verifyJWT);
recipeRoute.route("/").get(getRecipes).post(newRecipe);
recipeRoute.route("/:id").get(getRecipe).put(updateRecipe).delete(deleteRecipe);

export default recipeRoute;
