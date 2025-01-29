import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getBlogs = async (req: Request, res: Response) => {
  const blogs = await prisma.blog.findMany();

  if (blogs.length === 0) {
    res.status(404).json({ message: "No blogs found" });
    return;
  }

  res.json(blogs);
};

export const newBlog = async (req: Request, res: Response) => {
  const { title, content, category } = req.body;
  const userId = req.userId;
  console.log(userId);

  if (!title || !content || !category) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const newBlog = await prisma.blog.create({
    data: {
      title,
      content,
      category,
      userId,
    },
  });

  res.status(201).json(newBlog);
};

export const getBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  const blog = await prisma.blog.findUnique({ where: { blogId: +id } });

  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  res.json(blog);
};

export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  const userId = req.userId;

  if (!title || !content || !category) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const foundBlog = await prisma.blog.findUnique({
    where: { blogId: +id, userId },
  });

  if (!foundBlog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  await prisma.blog.update({
    where: {
      blogId: +id,
      userId,
    },
    data: {
      title,
      content,
      category,
    },
  });

  res.json({ message: "Blog updated successfully" });
};

export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  const blog = await prisma.blog.findUnique({ where: { blogId: +id } });

  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  await prisma.blog.delete({
    where: { blogId: +id },
  });

  res.status(204).send();
};
