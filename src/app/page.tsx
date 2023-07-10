import AuthForm from "@/components/AuthForm";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { ChevronLeft, Command } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container grid h-screen w-screen items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 md:right-8 md:top-8"
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
      </Link>
      <div className="hidden h-full bg-muted lg:block" />
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Command className="mx-auto h-6 w-6" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Selamat datang
          </h1>
          <p className="text-sm text-muted-foreground">
            Masukan email dan password untuk masuk ke akun Anda
          </p>
        </div>
        <AuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/register"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
