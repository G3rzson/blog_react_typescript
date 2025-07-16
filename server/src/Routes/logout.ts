import { Request, Response } from "express";

export async function logoutUser(req: Request, res: Response) {
  res
    .clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production", // csak production-ben true
    })
    .status(200)
    .json({ message: "Sikeres kijelentkezés" });
  return;
}
