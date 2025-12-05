import {z} from "zod";

export type SignInState = {
  errors? : string[];
  success? : boolean;
  message?: string;

} | undefined;

export const SignInSchema = z.object({
  email: z.string(),
  password: z.string(),
});