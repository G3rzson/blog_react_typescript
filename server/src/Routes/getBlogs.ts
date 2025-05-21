import { RequestHandler } from "express";
import BlogModel from "../DB/blogSchema";

export const getBlogs: RequestHandler = async (req, res) => {
  try {
    const blogs = await BlogModel.find().populate("userId", { username: 1, _id: 0 });

    res.json( blogs );
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
