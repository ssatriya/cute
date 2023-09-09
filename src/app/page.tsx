import AuthForm from "@/components/AuthForm";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { ChevronLeft, Command } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (session) {
    if (session.user.role === "admin") {
      redirect("/admin");
    }
    if (session.user.role === "karyawan") {
      redirect("/karyawan");
    }
    if (session.user.role === "verifikator") {
      redirect("/verifikator");
    }
    if (session.user.role === "atasan") {
      redirect("/atasan");
    }
    if (session.user.role === "kepala") {
      redirect("/kepala");
    }
  }

  return (
    <div className="container grid items-center justify-center w-screen sm:h-[500px] lg:h-screen lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="hidden h-full bg-muted lg:block" />
      <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Command className="w-6 h-6 mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Selamat datang
          </h1>
          <p className="text-sm text-muted-foreground">
            Masuk menggunakan akun Gmail untuk mengakses menu pengajuan cuti
            elektronik
          </p>
        </div>
        <AuthForm />
        {/* <p className="px-8 text-sm text-center text-muted-foreground">
          <Link
            href="/register"
            className="underline hover:text-brand underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p> */}
      </div>
    </div>
  );
}
