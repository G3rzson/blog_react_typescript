import { Response } from "express";
import { blogFormSchema } from "../Validation/blogForm";
import { AuthenticatedRequest } from "../middlewares/verifyToken";
import BlogModel from "../DB/blogSchema";

export async function updateBlog(req: AuthenticatedRequest, res: Response) {
  const blogId = req.params.id;

  const username = req.username;
  if (!username) {
    res
      .status(401)
      .json({ success: false, error: "Hiányzó felhasználói név!" });
    return;
  }

  // Validáció
  const parsed = blogFormSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { title, content } = parsed.data;

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
        error: "Nincs jogosultságod módosítani ezt a blogot!",
      });
      return;
    }

    // Módosítás
    await BlogModel.findByIdAndUpdate(
      blogId,
      { title, content },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Sikeres módosítás!",
    });
    return;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Valami hiba történt. Próbáld újra később!",
    });
    return;
  }
}
