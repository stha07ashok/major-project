import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

interface GoogleProfile {
  email: string;
  name: string;
  picture: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const res = await fetch(`${process.env.BACKEND_URL}/api/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              email: (profile as GoogleProfile).email,
              fullname: (profile as GoogleProfile).name,
              picture: (profile as GoogleProfile).picture,
            }),
          });

          const data = await res.json();
          if (data.success) {
            token.userId = data.user.id;
          }
        } catch {
          console.error("Error syncing with backend");
        }

        token.accessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.userId as string;
      return session;
    },
  },
};
