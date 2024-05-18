import { z } from "zod";
export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 char")
  .max(20, "Username must be less the 10 characters")
  .regex(/^[a-zA-Z0-9_]+$/, {
    message: "Username must not contain special characters",
  });

  export const signUpSchema=z.object({
    username: usernameValidation,
    email:z.string().email({message:"Invalid Email address"}),
    password:z.string().min(6,{message:"pass should be greater then 6 character"})
  })
