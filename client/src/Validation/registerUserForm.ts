import z from "zod";

export const registerFormSchema = z.object({
  username: z
    .string()
    .nonempty("Felhasználónév megadása kötelező!")
    .max(25, { message: "Túl hosszú Felhasználónév" })
    .trim(),

  email: z
    .string()
    .nonempty({ message: "E-mail cím megadása kötelező!" })
    .email({ message: "Hibás e-mail cím." })
    .max(25, "Maximum 25 karakter!")
    .trim(),

  password: z
    .string()
    .min(4, { message: "Jelszó túl rövid!" })
    .max(25, { message: "Jelszó túl hosszú!" })
    .trim(),

  role: z.enum(["author", "admin"]),
});

export type RegisterFormData = z.infer<typeof registerFormSchema>;
