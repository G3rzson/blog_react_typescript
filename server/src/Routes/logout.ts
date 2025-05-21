import { Request, Response } from "express";

export function logout(req: Request, res: Response) {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ message: "Nem sikerült kijelentkezni" });
      return 
    }
    res.clearCookie("connect.sid"); // alapértelmezett session cookie név
    res.json({ message: "Sikeres kijelentkezés" });
    return 
  });
}
