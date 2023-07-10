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

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
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
      </Form>
    </div>
  );
}
