import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received
   * as a prop on the `SessionProvider` React Context
   */
  interface Session {
    firebaseToken?: string;
    user: {
      id: string /** The user's id. */;
    } & DefaultSession["user"];
  }
}
