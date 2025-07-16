import { Request, Response } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { generateAccessToken } from "../functions/generateAccessToken";
import RegisterUserModel from "../DB/registerUserSchema";
dotenv.config();

export async function tokenUpdate(req: Request, res: Response) {
  const refreshToken = req.cookies.refreshToken;
  //console.log(refreshToken);

  if (!refreshToken) {
    res.status(401).json({ error: "Nincs refresh token" });
    return;
  }

  if (!process.env.REFRESH_TOKEN) {
    res.status(500).json({ error: "Hiányzó REFRESH_TOKEN környezeti változó" });
    return;
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN,
    async (
      err: VerifyErrors | null,
      decoded: string | JwtPayload | undefined
    ) => {
      if (err) {
        res.status(403).json({ error: "Érvénytelen token" });
        return;
      }

      try {
        // Lekérjük a usert az adatbázisból
        const username = (decoded as JwtPayload).user;
        const user = await RegisterUserModel.findOne({ username }).select(
          "username role"
        );
        if (!user) {
          return res.status(404).json({ error: "Felhasználó nem található" });
        }

        const accessToken = generateAccessToken(username);

        // Visszaadjuk az új access tokent ÉS a user adatokat
        res.json({
          accessToken,
          user,
        });
        return;
      } catch (dbErr) {
        console.error("Adatbázis hiba:", dbErr);
        res.status(500).json({ error: "Adatbázis hiba történt" });
        return;
      }
    }
  );
}
