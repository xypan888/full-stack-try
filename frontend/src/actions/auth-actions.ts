"use server";

import { signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "@/auth-credential";
import { z } from "zod";
import { redirect } from "next/navigation";
import { SignInSchema, SignInState} from "@/types/signin-schema";

export async function signIn(state: SignInState, formData: FormData) {
  const validatedData = SignInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedData.success) {
    const errors = z.treeifyError(validatedData.error)
    return errors
  } else {
    try{
      await nextAuthSignIn("credentials", {
        redirect: false,
        email: validatedData.data.email,
        password: validatedData.data.password,
      });
    } catch (error) {
      console.error("Sign-in error:", error);
      return { errors: ["Sign-in failed. Please try again."] };
    }
  }
  redirect("/");
}

export async function signOut() {
  console.log("Signing out user");
  try{
    await nextAuthSignOut({ redirect: false });
  }
  catch(error){
    console.error("Sign-out error:", error);
  }
  redirect("/signin");
}