import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getBlogs = async (req: Request, res: Response) => {
  res.send("this returns all blogs ");
};

// export const newBlog = async (req: Request, res: Response) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     res.status(400).json({ message: "Email and password are required" });
//     return;
//   }

//   const hashedPwd = await hash(password, 10);

//   const blog = await prisma.blog.create({
//     data: {
//       email,
//       password: hashedPwd,
//     },
//   });

//   res.status(201).json(blog);
// };

// export const getBlog = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const blog = await prisma.blog.findUnique({ where: { blogId: id } });

//   if (!blog) {
//     res.status(404).json({ message: "Blog not found" });
//     return;
//   }

//   res.json(blog);
// };

// export const updateBlog = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { email, password } = req.body;

//   const foundBlog = await prisma.blog.findUnique({ where: { blogId: id } });

//   if (!foundBlog) {
//     res.status(404).json({ message: "Blog not found" });
//     return;
//   }
// };

// export const deleteBlog = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   res.send(`this deletes a blog with an id #${id}`);
// };
