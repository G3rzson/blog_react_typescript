import { Response } from "express";
import BlogModel from "../DB/blogSchema";
import { AuthenticatedRequest } from "../middlewares/verifyToken";

export async function deleteBlog(req: AuthenticatedRequest, res: Response) {
  const blogId = req.params.id;

  const username = req.username;
  if (!username) {
    res
      .status(401)
      .json({ success: false, error: "Hiányzó felhasználói név!" });
    return;
  }

  try {
    // Blog keresése és jogosultság ellenőrzés
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      res.status(404).json({ success: false, error: "Blog nem található!" });
      return;
    }

    if (blog.author !== username) {
      res.status(403).json({
        success: false,
        error: "Nincs jogosultságod törölni ezt a blogot!",
      });
      return;
    }

    const deletedBlog = await BlogModel.findByIdAndDelete(blogId);

    if (!deletedBlog) {
      res.status(404).json({
        success: false,
        error: "A blog nem található.",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "A blog sikeresen törölve.",
    });
    return;
  } catch (error) {
    console.error("Törlési hiba:", error);
    res.status(500).json({
      success: false,
      error: "Valami hiba történt. Próbáld újra később.",
    });
    return;
  }
}
