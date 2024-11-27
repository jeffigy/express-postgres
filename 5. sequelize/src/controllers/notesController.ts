import { NextFunction, Request, Response } from "express";
import { Note, User } from "../models";

type CustomRequest = Request & {
  note?: any;
  decodedToken: {
    id: any;
  };
};

export const noteFinder = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  req.note = await Note.findByPk(req.params.id);
  next();
};

export const fetchNotes = async (req: Request, res: Response) => {
  const notes = await Note.findAll();
  res.json(notes);
};

export const newNote = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);

    if (!user) {
      res.status(401).json({ message: "unauthorized" });
      return;
    }

    const note = await Note.create({ ...req.body, userId: user.id });
    res.json(note);
  } catch (error) {
    res.status(400).json({ error });
    return;
  }
};

export const getNote = async (req: CustomRequest, res: Response) => {
  const note = req.note;
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
};

export const deleteNote = async (req: CustomRequest, res: Response) => {
  const note = req.note;
  if (note) {
    await note.destroy();
  }
  res.status(204).end();
};

export const updateNote = async (req: CustomRequest, res: Response) => {
  const note = req.note;
  if (note) {
    note.important = req.body.important;
    await note.save();
    res.json(note);
  } else {
    res.status(404).end();
  }
};
