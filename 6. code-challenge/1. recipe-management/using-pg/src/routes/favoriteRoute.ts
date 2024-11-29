import { Router } from "express";
import {
  deleteFavorite,
  getFavorite,
  getFavorites,
  newFavorite,
} from "../controllers/favoriteController";
import authenticate from "../middlewares/authenticate";

const favoriteRoute = Router();

favoriteRoute.use(authenticate);

favoriteRoute.route("/").get(getFavorites).post(newFavorite);
favoriteRoute.route("/:id").get(getFavorite).delete(deleteFavorite);

export default favoriteRoute;
