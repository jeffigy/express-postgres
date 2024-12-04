import { Request, Response } from "express";
import db from "../db";
import { blogs } from "../db/schema";
import { or, eq, ilike } from "drizzle-orm";

export const fetchBlogs = async (req: Request, res: Response) => {
  const { term } = req.query;

  const allBlogs = await db
    .select()
    .from(blogs)
    .where(
      or(
        ilike(blogs.title, `%${term}%`),
        ilike(blogs.content, `%${term}%`),
        ilike(blogs.category, `%${term}%`)
      )
    );
  if (allBlogs.length === 0) {
    res.status(404).json({ message: "No blogs found" });
    return;
  }

  res.json(allBlogs);
};
export const newBlog = async (req: Request, res: Response) => {
  const { title, content, category, tags } = req.body;

  if (!title || !content || !category || !tags) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  const newBlog = await db
    .insert(blogs)
    .values({ title, content, category: JSON.stringify(category), tags })
    .returning();

  res.json(newBlog);
};

export const fetchBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  const blog = await db
    .select()
    .from(blogs)
    .where(eq(blogs.blog_id, parseInt(id)));

  if (blog.length === 0) {
    res.status(404).json({ message: "No blog found" });
    return;
  }

  res.json(blog[0]);
};
export const editBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, category, tags } = req.body;

  const foundBlog = await db
    .select()
    .from(blogs)
    .where(eq(blogs.blog_id, parseInt(id)));

  if (foundBlog.length === 0) {
    res.status(404).json({ message: "No blog found" });
    return;
  }

  if (!id || !title || !content || !category || !tags) {
    res.status(400).json({ message: "All fields are required" });
    return;
  }

  await db
    .update(blogs)
    .set({ title, content, category: JSON.stringify(category), tags })
    .where(eq(blogs.blog_id, parseInt(id)))
    .returning();

  res.json({ message: "blog updated" });
};
export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ message: "blog id is required" });
    return;
  }

  const foundBlog = await db
    .select()
    .from(blogs)
    .where(eq(blogs.blog_id, parseInt(id)));

  if (foundBlog.length === 0) {
    res.status(404).json({ message: "No blog found" });
    return;
  }

  const deletedBlog = await db
    .delete(blogs)
    .where(eq(blogs.blog_id, parseInt(id)))
    .returning();

  res.json({ message: `Blog with title ${deletedBlog[0].title} deleted` });
};
