import { Response, Request } from "express";
import BlogModel from "../DB/blogSchema";

export async function getOneBlog(req: Request, res: Response) {
  try {
    const blog = await BlogModel.findById(req.params.id);

    if (!blog) {
      res.status(404).json({
        success: false,
        error: "A blog nem található.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      blog,
    });
    return;
  } catch (error) {
    //console.error("Szerverhiba blog lekérésekor:", error);
    res.status(500).json({
      success: false,
      error: "Valami hiba történt. Próbáld újra később.",
    });
    return;
  }
}
