"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Session } from "next-auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Button } from "@/components/ui/Button";

import { Input } from "@/components/ui/Input";
import { tandaTanganPenggantiPayload } from "@/lib/validators/karyawan/tangaTanganPengganti";
import { Icons } from "@/components/Icons";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const formSchema = z.object({
  tandaTanganPengganti: z.string({}),
});

type FormData = z.infer<typeof formSchema>;

interface FormPegawaiPenggantiProps {
  user: {
    id: number;
    namaLengkap: string;
    role: string;
  };
  idCuti: number;
}

export default function FormPegawaiPengganti({
  user,
  idCuti,
}: FormPegawaiPenggantiProps) {
  const router = useRouter();

  const { mutate: submitTandaTangan, isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      const payload: tandaTanganPenggantiPayload = {
        idCuti: idCuti,
        tangaTanganPengganti: data.tandaTanganPengganti,
        tahapVerifikasi: 1,
      };

      const { data: returnData } = await axios.post(
        "/api/karyawan/data-pengganti",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return returnData;
    },
    onSuccess: () => {
      router.push(`/${user.role}`);
    },
    onError: () => {
      toast({
        title: "Tanda tangan gagal",
        description:
          "Tanda tangan sebagai pegawai pengganti gagal, silahkan coba lagi.",
        variant: "destructive",
      });
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tandaTanganPengganti: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    submitTandaTangan(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Card>
          <CardHeader>
            <CardTitle>Persetujuan Pengganti</CardTitle>
            <CardDescription>
              Tulis nama lengkap Anda untuk menandatangani persetujuan sebagai
              pegawai pengganti
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="tandaTanganPengganti"
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Tanda tangan</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="tandaTanganPengganti"
                      name={name}
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      placeholder={user.namaLengkap!}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">
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
