import { z } from "zod";

export const blogSchema = z.object({
  blog: z.string().nonempty("Blog megadása kötelező!").trim(),
});
