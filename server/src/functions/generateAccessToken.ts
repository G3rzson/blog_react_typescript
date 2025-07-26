import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

// Access token generálása
export function generateAccessToken(user: string, role: string): string {
  const secret = process.env.ACCESS_TOKEN;
  if (!secret) {
    throw new Error("Hiányzó ACCESS_TOKEN környezeti változó");
  }

  return jwt.sign({ user, role }, secret, {
    expiresIn: "5m",
  });
}
