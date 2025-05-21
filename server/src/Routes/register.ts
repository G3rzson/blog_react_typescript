import { RequestHandler } from "express";
import RegisterUserModel from "../DB/registerUserSchema";
import { registerSchema } from "../Validation/registerSchema";
import bcrypt from "bcrypt";
import { ZodError } from "zod";

export const createUser: RequestHandler = async (req, res) => {
  try {
    const validateData = registerSchema.parse(req.body);
    const { username, email, password } = validateData;

    const existingUsername = await RegisterUserModel.findOne({ username });
    if (existingUsername) {
      res.status(400).json({ error: "Felhasználónév már foglalt!" });
      return;
    }

    const existingEmail = await RegisterUserModel.findOne({ email });
    if (existingEmail) {
      res.status(400).json({ error: "Email már foglalt!" });
      return;
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new RegisterUserModel({
      username,
      email,
      password: hashed,
    });

    await newUser.save();
    res.status(201).json({ message: "Sikeres regisztráció!" });
  } catch (err) {
    if (err instanceof ZodError) {
      res.status(400).json({ error: err.errors });
      return;
    }

    res.status(500).json({ error: "Hiba történt a regisztráció során." });
  }
};
