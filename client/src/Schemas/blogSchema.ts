import { z } from "zod";

export const blogSchema = z.object({
  blog: z
    .string()
    .nonempty("Nem lehet üres a mező!")
    .trim()
});
