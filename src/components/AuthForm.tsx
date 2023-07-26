"use client";

import { cn } from "@/lib/utils";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/Form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { Separator } from "./ui/Separator";
import { Icons } from "./Icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z.string({ required_error: "Email harus diisi." }),
  password: z.string({ required_error: "Password harus diisi." }).min(4, {
    message: "Password minimal 4 karakter.",
  }),
});

type FormSchema = z.infer<typeof formSchema>;

export default function AuthForm({ className, ...props }: AuthFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  // const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (error) {
      toast({
        title: "There was a problem.",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      {/* <Form {...form}>
        <form className="grid gap-3" noValidate>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="johndoe@gmail.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="******" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="mt-2">Login</Button>
        </form>
      </Form> */}

      {/* <Separator orientation="horizontal" /> */}
      <div className={(cn("flex justify-center"), className)} {...props}>
        <Button
          onClick={loginWithGoogle}
          isLoading={isLoading}
          size="sm"
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Icons.google className="w-4 h-4 mr-2" />
          )}
          Google
        </Button>
      </div>
    </div>
  );
}
