import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const TOKEN_EXPIRY = 3 * 60 * 60 ; 

export const {handlers, auth, signIn, signOut} = NextAuth({
  providers: [
    CredentialsProvider({
      credentials:{
        email:{ label: "Email", type: "email"},
        password:{ label: "Password", type: "password"}
      },
      async authorize(credentials){
        if(!credentials?.email || !credentials?.password){
          return null;
        }

        const res = await fetch(process.env.BACKEND_API_URL + "/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          })
        });
        if(!res.ok){
          return null;
        }
        const user = await res.json();
        console.log("Authorized User:", user);
        if (user) {
          return{
            id: user.id,
            email: user.email,
          }
        }
        return null;
      }
    })
  ],
  pages:{
    signIn: "/signin",
  },
  session:{
    strategy: "jwt",
    maxAge:TOKEN_EXPIRY,
  },
  callbacks:{
    async jwt({token, user}){
      if(user){
        token.id = user.id;
        token.email = user.email;
        const now = Math.floor(Date.now() / 1000);
        token.expiry = now + TOKEN_EXPIRY;
      }
      return token;
    },
    async session({session, token}){
      if(token && session.user){
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.expiry = token.expiry as number;
      }
      return session;
    }
  }

})
