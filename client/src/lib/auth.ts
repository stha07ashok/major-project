import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

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
      // When user signs in with Google
      if (account && profile) {
        try {
          // Send Google user info to backend
          const res = await fetch(`${process.env.BACKEND_URL}/api/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // important for cookies
            body: JSON.stringify({
              email: profile.email,
              fullname: profile.name,
              picture: (profile as any).picture,
            }),
          });

          const data = await res.json();
          if (data.success) {
            // Store backend user ID in token
            token.userId = data.user.id;
          }
        } catch (err) {
          console.error("Error syncing with backend:", err);
        }

        token.accessToken = account.access_token; // keep Google access token if needed
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.userId as string; // attach backend user id
      return session;
    },
  },
};
