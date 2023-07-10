"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Separator } from "@/components/ui/Separator";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TambahJabatanPayload } from "@/lib/validators/admin/tambahJabatan";
import { Icons } from "@/components/Icons";

const formSchema = z.object({
  namaJabatan: z.string({
    required_error: "Nama jabatan harus diisi",
  }),
  idBagian: z.string({
    required_error: "Nama bagian harus dipilih",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function FormTambahJabatan() {
  const router = useRouter();

  const { data: dataBagian } = useQuery({
    queryKey: ["bagian"],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/bagian");
      console.log(data);
      return data;
    },
  });

  const { mutate: submitDataJabatan, isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      const payload: TambahJabatanPayload = {
        namaJabatan: data.namaJabatan,
        idBagian: +data.idBagian,
      };

      const { data: responseData } = await axios.post(
        "/api/admin/jabatan",
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
      // router.replace("/admin/data-jabatan");
      window.location.href = "/admin/data-jabatan";
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  const onSubmit = async (data: FormData) => {
    submitDataJabatan(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Card>
          <CardHeader>
            <CardTitle>Formulir Tambah Data Jabatan</CardTitle>
            <CardDescription>Isi dengan data jabatan yang baru</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="namaJabatan"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Nama Jabatan</FormLabel>
                  <Input
                    type="text"
                    id="namaJabatan"
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="idBagian"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Nama Bagian</FormLabel>
                  <Select
                    onValueChange={onChange}
                    defaultValue={value}
                    name={name}
                  >
                    <FormControl>
                      <SelectTrigger onBlur={onBlur}>
                        <SelectValue placeholder="Pilih bagian" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dataBagian &&
                        dataBagian.result.map((bagian: any) => (
                          <SelectItem key={bagian.id} value={String(bagian.id)}>
                            {bagian.namaBagian}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator orientation="horizontal" />

            <Button disabled={isLoading} type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}{" "}
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
