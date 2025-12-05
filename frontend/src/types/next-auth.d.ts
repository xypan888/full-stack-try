import {DefaultUser, DefaultSession} from "next-auth";
import {JWT} from "next-auth/jwt";

declare module "next-auth"{
  interface User extends DefaultUser{
    id: string;
    email: string;
  }
  interface Session extends DefaultSession{
    user: User;
    expiry: number;
  }
}

declare module "next-auth/jwt"{
  interface JWT extends JWT{
    id: string;
    email: string;
    expiry: number;
  }
}