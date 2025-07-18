import { Response, Request } from "express";
import BlogModel from "../DB/blogSchema";

export async function getBlogs(req: Request, res: Response) {
  try {
    const blogs = await BlogModel.find();

    if (!blogs) {
      res.status(401).json({
        success: false,
        error: "Nincs blog!",
      });
      return;
    }

    res.status(201).json({
      success: true,
      blogs,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Valami hiba történt. Próbáld újra később.",
    });
    return;
  }
}
