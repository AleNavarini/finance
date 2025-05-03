import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { SessionType } from "@/types/session";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, profile }) {},
    async jwt({ token, account, user }) {
      if (account && user) {
        token.accessToken = account.access_token;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: SessionType; token: JWT }) {
      if (token) {
        session.user = {
          email: token.email,
          id: token.name,
          image: token.picture,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error",
  },
};
