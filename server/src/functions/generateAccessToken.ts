import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

// Access token generálása
export function generateAccessToken(user: string): string | undefined {
  if (!process.env.ACCESS_TOKEN) {
    console.error("Hiányzó ACCESS_TOKEN környezeti változó");
    return undefined;
  }
  return jwt.sign({ user }, process.env.ACCESS_TOKEN, { expiresIn: "5m" });
}
