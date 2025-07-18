import z from "zod";

export const blogFormSchema = z.object({
  title: z
    .string()
    .nonempty("Cím megadása kötelező!")
    .max(50, { message: "Túl hosszú cím!" })
    .trim(),

  content: z
    .string()
    .nonempty("Tartalom megadása kötelező!")
    .max(500, { message: "Túl hosszú tartalom!" })
    .trim(),
});

export type BlogFormData = z.infer<typeof blogFormSchema>;
