import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .nonempty("Felhasználónév megadása kötelező!")
    .trim()
    .min(4, "Minimum 4 karakter!")
    .max(15, "Maximum 15 karakter!"),
  email: z
    .string()
    .nonempty("Email cím megadása kötelező!")
    .trim()
    .email("Hibás email cím!")
    .max(25, "Maximum 25 karakter!"),
  password: z
    .string()
    .min(6, "A jelszó legalább 6 karakter legyen!")
    .max(25, "Maximum 25 karakter!")
    //.regex(/[A-Z]/, "Kell legalább egy nagybetű!")
    //.regex(/[a-z]/, "Kell legalább egy kisbetű!")
    //.regex(/[0-9]/, "Kell legalább egy szám!")
    //.regex(/[^A-Za-z0-9]/, "Kell egy speciális karakter!"),
});
