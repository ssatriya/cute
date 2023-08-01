import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    if (!req.nextauth.token) {
      return NextResponse.rewrite(new URL("/", req.url));
    }

    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/karyawan") &&
      req.nextauth.token?.role !== "karyawan"
    ) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/atasan") &&
      req.nextauth.token?.role !== "atasan"
    ) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/verifikator") &&
      req.nextauth.token?.role !== "verifikator"
    ) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
    if (
      req.nextUrl.pathname.startsWith("/kepala") &&
      req.nextauth.token?.role !== "kepala"
    ) {
      return NextResponse.rewrite(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/karyawan/:path*", "/atasan/:path*"],
};
