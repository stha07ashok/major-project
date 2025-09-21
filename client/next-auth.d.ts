import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];

    accessToken?: string;
    refreshToken?: string;
    appToken?: string;
  }

  interface JWT {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
    appToken?: string;
  }
}
