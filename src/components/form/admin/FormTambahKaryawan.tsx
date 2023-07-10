"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Icons } from "@/components/Icons";

const formSchema = z.object({
  nip: z.string({
    required_error: "NIP harus diisi",
  }),
  namaLengkap: z.string({
    required_error: "Nama lengkap harus diisi",
  }),
  jabatan: z.string({
    required_error: "Jabatan harus dipilih",
  }),
  jenisKelamin: z.string({
    required_error: "Jenis kelamin harus dipilih",
  }),
  tempatLahir: z.string({
    required_error: "Tempat lahir harus diisi",
  }),
  tanggalLahir: z.string({
    required_error: "Tanggal lahir harus diisi",
  }),
  email: z.string({
    required_error: "Email harus diisi",
  }),
  password: z.string({
    required_error: "Password harus diisi",
  }),
  foto: z.any({}),
  role: z.string({
    required_error: "Role harus dipilih",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function FormTambahKaryawan() {
  const [foto, setFoto] = useState<string>("");

  const { data: dataJabatan } = useQuery({
    queryKey: ["jabatan"],
    queryFn: async () => {
      const { data } = await axios.get("/api/admin/jabatan");
      return data;
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nip: "",
      namaLengkap: "",
      jabatan: "",
      jenisKelamin: "",
      tempatLahir: "",
      tanggalLahir: "",
      email: "",
      password: "",
      foto: "",
      role: "",
    },
    mode: "onChange",
  });

  const { mutate: submitDataKaryawan, isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();

      console.log();

      formData.append("nip", data.nip);
      formData.append("namaLengkap", data.namaLengkap);
      formData.append("jabatan", data.jabatan);
      formData.append("jenisKelamin", data.jenisKelamin);
      formData.append("tempatLahir", data.tempatLahir);
      formData.append(
        "tanggalLahir",
        new Date(data.tanggalLahir).toISOString()
      );
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("foto", data.foto);
      formData.append("role", data.role);

      const { data: responseData } = await axios.post(
        "/api/admin/karyawan",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return responseData;
    },
    onSuccess: () => {
      // router.replace("/admin/data-karyawan");
      window.location.href = "/admin/data-karyawan";
    },
  });

  const onSubmit = async (data: FormData) => {
    submitDataKaryawan(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
        encType="multipart/form-data"
      >
        <Card>
          <CardHeader>
            <CardTitle>Formulir Tambah Data Karyawan</CardTitle>
            <CardDescription>
              Isi formulir dengan data karyawan sebagai pengguna baru
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="nip"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>NIP</FormLabel>
                  <Input
                    type="text"
                    id="nip"
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value || ""}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="namaLengkap"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <Input
                    type="text"
                    id="namaLengkap"
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value || ""}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jabatan"
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Jabatan</FormLabel>
                  <Select
                    onValueChange={onChange}
                    defaultValue={value || ""}
                    name={name}
                  >
                    <FormControl>
                      <SelectTrigger onBlur={onBlur}>
                        <SelectValue placeholder="Pilih jabatan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {dataJabatan &&
                        dataJabatan.result.map((jabatan: any) => (
                          <SelectItem
                            key={jabatan.id}
                            value={String(jabatan.id)}
                          >
                            {jabatan.namaJabatan}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jenisKelamin"
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <Select
                    onValueChange={onChange}
                    defaultValue={value || ""}
                    name={name}
                  >
                    <FormControl>
                      <SelectTrigger onBlur={onBlur}>
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="PRIA">Pria</SelectItem>
                      <SelectItem value="WANITA">Wanita</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tempatLahir"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Tempat Lahir</FormLabel>
                  <Input
                    type="text"
                    id="tempatLahir"
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tanggalLahir"
              render={({ field: { onChange, onBlur, name, value } }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <Input
                    type="date"
                    name={name}
                    id="tanggalLahir"
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
              name="email"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="text"
                    id="email"
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="text"
                    id="password"
                    name={name}
                    value={value || ""}
                    onChange={onChange}
                    onBlur={onBlur}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="foto"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, name } }) => (
                <FormItem>
                  <FormLabel>Foto</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      id="foto"
                      value={foto}
                      onChange={(e) => {
                        setFoto(e.target.value);
                        onChange(e.target.files![0]);
                      }}
                      onBlur={onBlur}
                      name={name}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="role"
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select
                    onValueChange={onChange}
                    defaultValue={value || ""}
                    name={name}
                  >
                    <FormControl>
                      <SelectTrigger onBlur={onBlur}>
                        <SelectValue placeholder="Select a verified email to display" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ADMIN">Admin</SelectItem>
                      <SelectItem value="KEPALA">Kepala</SelectItem>
                      <SelectItem value="ATASAN">Atasan</SelectItem>
                      <SelectItem value="KARYAWAN">Karyawan</SelectItem>
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
