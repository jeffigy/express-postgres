import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getBlogs = async (req: Request, res: Response) => {
  const userId = req.userId;
  const blogs = await prisma.blog.findMany({
    where: { userId },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (blogs.length === 0) {
    res.status(404).json({ message: "No blogs found" });
    return;
  }

  res.json(blogs);
};

export const newBlog = async (req: Request, res: Response) => {
  const { title, content, category, tags } = req.body;
  const userId = req.userId;
  console.log(userId);

  if (!title || !content || !category || !tags || !Array.isArray(tags)) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const newBlog = await prisma.blog.create({
    data: {
      title,
      content,
      category,
      userId,
      tags: {
        create: tags.map((tag) => ({
          tag: {
            connectOrCreate: {
              where: { name: tag.toLowerCase() },
              create: { name: tag.toLowerCase() },
            },
          },
        })),
      },
    },
  });

  res.status(201).json(newBlog);
};

export const getBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  const blog = await prisma.blog.findUnique({
    where: { blogId: +id },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  });

  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  res.json(blog);
};

export const updateBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, category, tags } = req.body;
  const userId = req.userId;

  // if (!title || !content || !category) {
  //   res.status(400).json({ message: "All fields are required" });
  //   return;
  // }

  const foundBlog = await prisma.blog.findUnique({
    where: { blogId: +id, userId },
  });

  if (!foundBlog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  await prisma.blog.update({
    where: { blogId: +id }, // Ensure id is an integer
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

  await prisma.blogTag.deleteMany({
    where: { blogId: +id },
  });

  await prisma.blog.delete({
    where: { blogId: +id },
  });

  res.status(204).send();
};
