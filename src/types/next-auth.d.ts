import { RolePengguna } from "@prisma/client";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;
type UserRole = RolePengguna;
type UserNIP = string;

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    namaLengkap?: string | null;
    role: UserRole | null;
    nip: UserNIP | null;
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      namaLengkap?: string | null;
      role: UserRole | null;
      nip: UserNIP | null;
    };
  }
}
