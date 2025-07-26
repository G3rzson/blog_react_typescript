import { Response } from "express";
import BlogModel from "../DB/blogSchema";
import { AuthenticatedRequest } from "../middlewares/verifyToken";

export async function deleteBlog(req: AuthenticatedRequest, res: Response) {
  const blogId = req.params.id;

  const role = req.role;
  if (!role) {
    res.status(401).json({ success: false, error: "Hiányzó engedély!" });
    return;
  }

  try {
    // Blog keresése
    const blog = await BlogModel.findById(blogId);
    if (!blog) {
      res.status(404).json({ success: false, error: "Blog nem található!" });
      return;
    }

    // Jogosultság ellenőrzés: csak admin törölhet
    if (role !== "admin") {
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
