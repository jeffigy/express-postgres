import { Router } from "express";
import {
  deleteFavorite,
  getFavorite,
  getFavorites,
  newFavorite,
} from "../controllers/favoriteController";
import verifyJWT from "../middlewares/verifyJWT";

const favoriteRoute = Router();

favoriteRoute.use(verifyJWT);

favoriteRoute.route("/").get(getFavorites).post(newFavorite);
favoriteRoute.route("/:id").get(getFavorite).delete(deleteFavorite);

export default favoriteRoute;
