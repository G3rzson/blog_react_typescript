import { RequestHandler } from "express";
import { ZodError } from "zod";
import { blogSchema } from "../Validation/blogSchema";
import BlogModel from "../DB/blogSchema";
import mongoose from "mongoose";

export const newBlogs: RequestHandler = async (req, res) => {
  try {
    const validateData = blogSchema.parse(req.body);
    const { blog } = validateData;

    const newBlog = new BlogModel({
      userId: new mongoose.Types.ObjectId(req.session.user?.id),
      blog,
    });

    await newBlog.save();

    res.status(201).json({ message: "Sikeres mentés!" });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return;
    }
  }
};
