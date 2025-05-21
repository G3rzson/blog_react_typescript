import { Request, Response } from "express";
import { loginSchema } from "../Validation/loginSchema";
import bcrypt from "bcrypt";
import RegisterUserModel from "../DB/registerUserSchema";

type UserType = {
  username: string;
  password: string;
};

export async function login(req: Request<{}, {}, UserType>, res: Response) {
  const user = loginSchema.safeParse(req.body);

  if (!user.success) {
    res.status(400).json({
      message: "Hibás adatok",
      errors: user.error.format(),
    });
    return;
  }

  const { username, password } = user.data;

  try {
    const existingUser = await RegisterUserModel.findOne({ username });

    if (!existingUser) {
      res.status(400).json({ error: "Felhasználó nem található!" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      res.status(401).json({ error: "Hibás jelszó!" });
      return;
    }

    req.session.user = {
      id: existingUser._id.toString(),
      username: existingUser.username,
    };

    // ki van bejelentkezve?
    //console.log(req.session.user.username)

    res.status(200).json({
      message: "Sikeres bejelentkezés",
      user: req.session.user,
    });
    return;
  } catch (error) {
    console.error("Hiba a beléptetés során:", error);
    res
      .status(500)
      .json({ error: "Valami hiba történt a bejelentkezés közben" });
    return;
  }
}
