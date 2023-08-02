"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
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
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Skeleton } from "../ui/Skeleton";
import { EditJabatanPayload } from "@/lib/validators/jabatan";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  idJabatan: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface FormPengaturanJabatanProps {
  user: {
    id: number;
  };
}

export default function FormPengaturanJabatan({
  user,
}: FormPengaturanJabatanProps) {
  const router = useRouter();

  const { data: dataJabatan, isLoading } = useQuery({
    queryKey: ["dataJabatan"],
    queryFn: async () => {
      const { data } = await axios.get("/api/karyawan/data-jabatan");
      return data.result;
    },
  });

  const { mutate: submitJabatan, isLoading: isLoadingSubmit } = useMutation({
    mutationFn: async (data: FormData) => {
      const payload: EditJabatanPayload = {
        id: user.id,
        idJabatan: +data.idJabatan,
      };

      const response = await axios.post("/api/jabatan", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onError: () => {
      return toast({
        title: "Gagal menyimpan data",
        description: "Data bagian gagal disimpan, coba lagi nanti.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push("/karyawan");
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      idJabatan: undefined,
    },
  });

  const onSubmit = async (data: FormData) => {
    submitJabatan(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Card>
          <CardHeader>
            <CardTitle>Pengaturan Jabatan</CardTitle>
            <CardDescription>
              Lengkapi data jabatan Anda sebelum membuat pengajuan cuti
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="idJabatan"
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <FormControl>
                    <Select onValueChange={onChange} value={value} name={name}>
                      <FormControl>
                        {isLoading ? (
                          <Skeleton className="w-full h-10 border" />
                        ) : (
                          <SelectTrigger onBlur={onBlur}>
                            <SelectValue placeholder="Pilih bagian" />
                          </SelectTrigger>
                        )}
                      </FormControl>
                      <SelectContent>
                        {dataJabatan &&
                          dataJabatan.map((jabatan: any) => (
                            <SelectItem
                              key={jabatan.id}
                              value={String(jabatan.id)}
                            >
                              {jabatan.namaJabatan}
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
            <Button disabled={isLoadingSubmit} type="submit">
              {isLoadingSubmit && (
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
