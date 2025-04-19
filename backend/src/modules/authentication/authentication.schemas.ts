import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    username: z.string(),
    name: z.string(),
  }),
});

export const loginScehma = z.object({
  body: z
    .object({
      email: z.string().email().optional(),
      username: z.string().optional(),
      password: z.string().min(8),
    })
    .refine((data) => data.email || data.username, {
      message: "Email or username is required",
      path: ["email"],
    }),
});

export type RegisterSchema = z.infer<typeof registerSchema.shape.body>;
export type LoginSchema = z.infer<typeof loginScehma.shape.body>;
