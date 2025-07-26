import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Először egy új interfész:
export interface AuthenticatedRequest extends Request {
  username?: string;
  role?: string;
}

export function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.refreshToken;
  if (!token) {
    res.status(401).json({ message: "Nincs token!" });
    return;
  }

  if (!process.env.REFRESH_TOKEN) {
    res.status(500).json({ error: "Hiányzó REFRESH_TOKEN környezeti változó" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN) as {
      user: string;
      role: string;
    };
    //console.log(decoded);
    req.username = decoded.user;
    req.role = decoded.role;
    next();
  } catch (err) {
    res.status(403).json({ message: "Érvénytelen token!" });
    return;
  }
}
