import { Router } from "express";
import { fetchPets, newPet } from "../controllers/petController";

const petRoute = Router();

petRoute.route("/").get(fetchPets).post(newPet);
export default petRoute;
