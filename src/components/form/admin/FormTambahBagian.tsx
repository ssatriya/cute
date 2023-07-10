"use client";

import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

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
import { Separator } from "@radix-ui/react-separator";
import { Button } from "@/components/ui/Button";
import { TambahBagianPayload } from "@/lib/validators/admin/tambahBagian";
import axios from "axios";
import { Icons } from "@/components/Icons";

const formSchema = z.object({
  namaBagian: z.string(),
  nipAtasanLangsung: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export default function FormTambahBagian() {
  const { mutate: submitDataBagian, isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      const payload: TambahBagianPayload = {
        namaBagian: data.namaBagian,
        nipAtasanLangsung: data.nipAtasanLangsung,
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

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      namaBagian: "",
      nipAtasanLangsung: "",
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
              name="nipAtasanLangsung"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Nama Atasan Langsung</FormLabel>
                  <Select
                    onValueChange={onChange}
                    defaultValue={value || ""}
                    name={name}
                  >
                    <FormControl>
                      <SelectTrigger onBlur={onBlur}>
                        <SelectValue placeholder="Pilih atasan langsung" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="430010583">Sumarno</SelectItem>
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
