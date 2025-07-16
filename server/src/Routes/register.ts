import { Request, Response } from "express";
import { registerSchema } from "../Validation/registerSchema";
import RegisterUserModel from "../DB/registerUserSchema";
import bcrypt from "bcryptjs";

export async function registerUser(req: Request, res: Response) {
  //console.log(req.body);

  // validálás
  const parsed = registerSchema.safeParse(req.body);
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
  const { username, email, password, role } = parsed.data;

  try {
    // felhasználó ellenőrzése
    const existingUser = await RegisterUserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        error: "Ez a felhasználónév vagy email már foglalt!",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(hashedPassword);

    await RegisterUserModel.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      success: true,
      message: "Sikeres regisztráció",
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Valami hiba történt. Próbáld újra később.",
    });
    return;
  }
}
