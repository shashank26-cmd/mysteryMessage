import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(10, "Minimum 10 characters")
    .max(300, "content should not be greater then 300"),
});
