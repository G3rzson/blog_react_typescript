import { Request, Response } from "express";

export function profile(req: Request, res: Response) {
  res.json({ user: req.session.user });
}
