import { Response } from "express";
import BlogModel from "../DB/blogSchema";
import { AuthenticatedRequest } from "../middlewares/verifyToken";

export async function getMyBlogs(req: AuthenticatedRequest, res: Response) {
  const username = req.username;
  if (!username) {
    res.status(401).json({ success: false, error: "Hiányzó felhasználói név" });
    return;
  }

  //console.log(username);

  try {
    const myBlogs = await BlogModel.find({ author: username });

    if (!myBlogs) {
      res.status(401).json({
        success: false,
        error: "Nincs blog!",
      });
      return;
    }

    res.status(201).json({
      success: true,
      myBlogs,
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
