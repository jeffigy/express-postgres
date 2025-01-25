import { Request, Response } from "express";

export const getBlogs = async (req: Request, res: Response) => {
  res.send("this gets all of the blogs");
};

export const newBlog = async (req: Request, res: Response) => {
  res.send("this adds a new blog");
};

export const getBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`this gets a blog with an id #${id}`);
};

export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`this updates a blog with an id #${id}`);
};

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  res.send(`this deletes a blog with an id #${id}`);
};
