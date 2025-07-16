import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .nonempty("Felhasználónév megadása kötelező!")
    .trim()
    .max(25, "Maximum 25 karakter!"),

  email: z
    .string()
    .nonempty("Email cím megadása kötelező!")
    .trim()
    .email("Hibás email cím!")
    .max(25, "Maximum 25 karakter!"),

  password: z
    .string()
    .trim()
    .min(4, "A jelszó legalább 4 karakter legyen!")
    .max(25, "Maximum 25 karakter!"),
  //.regex(/[A-Z]/, "Kell legalább egy nagybetű!")
  //.regex(/[a-z]/, "Kell legalább egy kisbetű!")
  //.regex(/[0-9]/, "Kell legalább egy szám!")
  //.regex(/[^A-Za-z0-9]/, "Kell egy speciális karakter!"),
  role: z.enum(["author", "admin"]),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
