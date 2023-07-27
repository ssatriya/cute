"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";

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
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/Button";
import { TambahBagianPayload } from "@/lib/validators/admin/tambahBagian";
import axios from "axios";
import { Icons } from "@/components/Icons";
import { Skeleton } from "@/components/ui/Skeleton";

const formSchema = z.object({
  namaBagian: z.string(),
  idAtasan: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function FormTambahBagian() {
  const { mutate: submitDataBagian, isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      const payload: TambahBagianPayload = {
        namaBagian: data.namaBagian,
        idAtasan: +data.idAtasan,
      };

      const { data: responseData } = await axios.post(
        "/api/admin/bagian",
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
      window.location.href = "/admin/data-bagian";
    },
  });

  const { data: dataAtasan, isLoading: isDataAtasanLoading } = useQuery({
    queryKey: ["dataAtasan"],
    queryFn: async () => {
      const {
        data: { data },
      } = await axios.get("/api/admin/karyawan");
      return data;
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaBagian: "",
      idAtasan: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    submitDataBagian(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Card>
          <CardHeader>
            <CardTitle>Tambah Data Bagian</CardTitle>
            <CardDescription>
              Isi dengan data bagian (departemen) baru
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="namaBagian"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Nama Bagian</FormLabel>
                  <Input
                    type="text"
                    id="namaBagian"
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
              name="idAtasan"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Nama Atasan Langsung</FormLabel>
                  <FormControl>
                    <Select onValueChange={onChange} value={value} name={name}>
                      <FormControl>
                        {isDataAtasanLoading ? (
                          <Skeleton className="w-full h-10 border" />
                        ) : (
                          <SelectTrigger onBlur={onBlur}>
                            <SelectValue placeholder="Pilih bagian" />
                          </SelectTrigger>
                        )}
                      </FormControl>
                      <SelectContent>
                        {dataAtasan &&
                          dataAtasan.map((atasan: any) => (
                            <SelectItem
                              key={atasan.id}
                              value={String(atasan.id)}
                            >
                              {atasan.namaLengkap}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
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
