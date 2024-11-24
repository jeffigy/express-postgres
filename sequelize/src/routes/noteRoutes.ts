import { Router } from "express";
import {
  deleteNote,
  fetchNotes,
  getNote,
  newNote,
  noteFinder,
  updateNote,
} from "../controllers/notesController";
import tokenExtractor from "../middlewares/tokenExtractor";

const noteRoutes = Router();

noteRoutes.route("/").get(fetchNotes).post(tokenExtractor, newNote);
noteRoutes
  .route("/:id")
  .get(noteFinder, getNote)
  .put(noteFinder, updateNote)
  .delete(noteFinder, deleteNote);

export default noteRoutes;
