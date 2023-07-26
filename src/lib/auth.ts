import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";
import { nanoid } from "nanoid";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.namaLengkap = token.namaLengkap;
        session.user.role = token.role;
        session.user.nip = token.nip;
      }

      return session;
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!dbUser) {
        token.id = user!.id;
        return token;
      }

      if (!dbUser.namaLengkap) {
        await db.user.update({
          where: {
            id: dbUser.id,
          },
          data: {
            namaLengkap: nanoid(10),
          },
        });
      }

      const stringId = String(dbUser.id);

      return {
        id: stringId,
        name: dbUser.name,
        namaLengkap: dbUser.namaLengkap,
        email: dbUser.email,
        picture: dbUser.image,
        role: dbUser.role,
        nip: dbUser.nip,
      };
    },
    redirect() {
      return "/";
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
