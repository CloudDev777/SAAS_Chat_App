import { FirestoreAdapter } from "@auth/firebase-adapter";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { adminAuth, adminDB } from "./firebase-admin";

export const nextAuthOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: FirestoreAdapter(adminDB),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    //  when jwt is signed append user.id in token information
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
    // append the token.sub (userId) created in jwt() and add it in session on client side
    session: async ({ session, token }) => {
      if (session.user) {
        if (token?.sub) {
          session.user.id = token.sub;

          // use the userId to create a custom token for user logged in and create firebaseToken
          const firebaseToken = await adminAuth.createCustomToken(token.sub);
          session.firebaseToken = firebaseToken;
        }
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
