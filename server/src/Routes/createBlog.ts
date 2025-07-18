import { Response } from "express";
import { blogFormSchema } from "../Validation/blogForm";
import { AuthenticatedRequest } from "../middlewares/verifyToken";
import RegisterUserModel from "../DB/registerUserSchema";
import BlogModel from "../DB/blogSchema";

export async function createBlog(req: AuthenticatedRequest, res: Response) {
  //console.log(req.body);

  const username = req.username;
  if (!username) {
    res.status(401).json({ success: false, error: "Hiányzó felhasználói név" });
    return;
  }

  //console.log(username);

  // validálás
  const parsed = blogFormSchema.safeParse(req.body);
  //console.log(parsed);

  // validálás ellenőrzése
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      error: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  // user data
  const { title, content } = parsed.data;

  try {
    const existingUser = await RegisterUserModel.findOne({ username });

    if (!existingUser) {
      res.status(401).json({
        success: false,
        error: "Nincs ilyen Felhasználó!",
      });
      return;
    }

    await BlogModel.create({
      title,
      content,
      author: username,
    });

    res.status(201).json({
      success: true,
      message: "Sikeres létrehozás",
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
