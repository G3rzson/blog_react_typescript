import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .nonempty("Felhasználónév megadása kötelező!")
    .trim()
    .max(15, "Maximum 15 karakter!"),
  password: z
    .string()
    .max(25, "Maximum 25 karakter!"),
});
