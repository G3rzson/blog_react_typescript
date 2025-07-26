import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

// Refresh token generálása
export function generateRefreshToken(user: string, role: string): string {
  const refreshSecret = process.env.REFRESH_TOKEN;

  if (!refreshSecret) {
    throw new Error("Hiányzó REFRESH_TOKEN környezeti változó");
  }

  return jwt.sign({ user, role }, refreshSecret, { expiresIn: "1d" });
}
