import z from "zod";

export const loginFormSchema = z.object({
  username: z
    .string()
    .nonempty("Felhasználónév megadása kötelező!")
    .max(25, { message: "Túl hosszú Felhasználónév" })
    .trim(),

  password: z
    .string()
    .min(4, { message: "Jelszó túl rövid!" })
    .max(25, { message: "Jelszó túl hosszú!" })
    .trim(),
});

export type LoginFormData = z.infer<typeof loginFormSchema>;
