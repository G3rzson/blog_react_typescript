import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

// Access token generálása
export function generateRefreshToken(user: string): string | undefined {
  if (!process.env.REFRESH_TOKEN) {
    console.error("Hiányzó REFRESH_TOKEN környezeti változó");
    return undefined;
  }
  return jwt.sign({ user }, process.env.REFRESH_TOKEN, { expiresIn: "1d" });
}
