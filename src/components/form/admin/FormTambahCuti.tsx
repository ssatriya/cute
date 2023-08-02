"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useMutation } from "@tanstack/react-query";
import { TambahCutiPayload } from "@/lib/validators/admin/tambahCuti";
import axios from "axios";
import { Icons } from "@/components/Icons";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  namaCuti: z.string({
    required_error: "Nama cuti harus diisi",
  }),
  lamaCuti: z.string({
    required_error: "Lama cuti harus diisi",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function FormTambahCuti() {
  const router = useRouter();

  const { mutate: submitDataCuti, isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      const payload: TambahCutiPayload = {
        namaCuti: data.namaCuti,
        lamaCuti: data.lamaCuti,
      };

      const { data: responseData } = await axios.post(
        "/api/admin/cuti",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return responseData;
    },
    onSuccess: () => {
      // router.push("/admin/data-cuti");
      window.location.href = "/admin/data-cuti";
    },
    onError: () => {
      toast({
        title: "Gagal menyimpan!",
        description: "Data cuti gagal disimpan, coba lagi nanti.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaCuti: "",
      lamaCuti: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    submitDataCuti(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Card>
          <CardHeader>
            <CardTitle>Formulir Tambah Data Cuti</CardTitle>
            <CardDescription>Tambah data jenis cuti baru</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="namaCuti"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Nama Cuti</FormLabel>
                  <Input
                    type="text"
                    id="namaCuti"
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value || ""}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lamaCuti"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Lama Cuti</FormLabel>
                  <Input
                    type="text"
                    id="namaCuti"
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button disabled={isLoading} type="submit">
              {isLoading && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}{" "}
              Submit
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
