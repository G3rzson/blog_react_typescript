import { Request, Response } from "express";
import RegisterUserModel from "../DB/registerUserSchema";
import bcrypt from "bcryptjs";
import { loginSchema } from "../Validation/loginSchema";
import dotenv from "dotenv";
import { generateAccessToken } from "../functions/generateAccessToken";
import { generateRefreshToken } from "../functions/generateRefreshToken";
dotenv.config();

export async function loginUser(req: Request, res: Response) {
  //console.log(req.body);

  // validálás
  const parsed = loginSchema.safeParse(req.body);
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
  const { username, password } = parsed.data;

  try {
    // felhasználó ellenőrzése
    const existingUser = await RegisterUserModel.findOne({ username });

    if (!existingUser) {
      res.status(401).json({
        success: false,
        error: "Nincs ilyen Felhasználó!",
      });
      return;
    }

    // jelszó ellenőrzése
    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      res.status(401).json({
        success: false,
        error: "Hibás jelszó!",
      });
      return;
    }

    // környezeti változók ellenőrzése
    if (!process.env.ACCESS_TOKEN || !process.env.REFRESH_TOKEN) {
      res.status(500).json({ message: "Hiányzó környezeti változók!" });
      return;
    }

    // access token létrehozása
    const accessToken = generateAccessToken(
      existingUser.username,
      existingUser.role
    );

    // refresh token létrehozása
    const refreshToken = generateRefreshToken(
      existingUser.username,
      existingUser.role
    );

    // válasz küldése cookie beállítása
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 nap
      })
      .json({
        success: true,
        accessToken,
        user: {
          username: existingUser.username,
          role: existingUser.role,
        },
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Valami hiba történt. Próbáld újra később!",
    });
    return;
  }
}
