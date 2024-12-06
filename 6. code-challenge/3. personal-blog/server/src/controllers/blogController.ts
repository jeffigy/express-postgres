import { Request, Response } from "express";
import db from "../db";
import { blogs } from "../db/schema/blogs";
import { eq } from "drizzle-orm";
import { isCuid } from "@paralleldrive/cuid2";

//* Get all blogs
export const getBlogs = async (req: Request, res: Response) => {
  //   const { userId } = req.user_id;

  const allBlogs = await db.select().from(blogs);

  //   const usersBlogs = await db
  //     .select()
  //     .from(blogs)
  //     .innerJoin(users, eq(blogs.userId, users.userId))
  //     .where(eq(users.userId, userId));

  //   const fetchBlogs = userId ? usersBlogs : allBlogs;

  if (allBlogs.length === 0) {
    res.status(404).json({ message: "No blogs found" });
    return;
  }

  res.json(allBlogs);
};

//* Get a blog
export const getBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || typeof id !== "string" || !isCuid(id)) {
    res.status(400).json({ message: "Invalid blog Id" });
    return;
  }

  const blog = await db.select().from(blogs).where(eq(blogs.blogId, id));

  if (blog.length === 0) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  res.json(blog[0]);
};

//* New Blog
export const newBlog = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  if (!title) {
    res.status(400).json({ message: "Title is required" });
    return;
  }

  const newBlog = await db.insert(blogs).values({ title, content }).returning();

  res.status(201).json(newBlog);
};

//* Edit Blog
export const editBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!id || typeof id !== "string" || !isCuid(id)) {
    res.status(400).json({ message: "Invalid blog Id" });
    return;
  }

  const foundBlog = await db.select().from(blogs).where(eq(blogs.blogId, id));

  if (foundBlog.length === 0) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  const updatedBlog = await db
    .update(blogs)
    .set({ title, content })
    .where(eq(blogs.blogId, id))
    .returning();

  res.json(updatedBlog[0]);
};

//* Delete Blog
export const deleteBlog = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || typeof id !== "string" || !isCuid(id)) {
    res.status(400).json({ message: "Invalid blog Id" });
    return;
  }

  const blog = await db.select().from(blogs).where(eq(blogs.blogId, id));

  if (blog.length === 0) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }

  const deletedBlog = await db
    .delete(blogs)
    .where(eq(blogs.blogId, id))
    .returning();

  res.json({ message: `Blog with title "${deletedBlog[0].title}" deleted` });
};
