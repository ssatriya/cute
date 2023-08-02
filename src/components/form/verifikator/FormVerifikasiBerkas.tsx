"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/Form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { Separator } from "@/components/ui/Separator";
import { Button } from "@/components/ui/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { verifikasiBerkasPayload } from "@/lib/validators/verifikator/verifikasiBerkas";
import axios from "axios";
import { Icons } from "@/components/Icons";

import { Session } from "next-auth";

import { encryptId } from "@/lib/crypto";

interface FormVerifikasiBerkasProps {
  cuti: {
    idCuti: number;
    idJenisCuti: number;
    nip: string;
    berkas: string;
  };
  session: Omit<Session, "expires">;
}

const formSchema = z.object({
  berkasCuti: z.string(),
  suratPermintaanCuti: z.string(),
  formulirCuti: z.string(),
  beritaAcaraCuti: z.string(),
  keteranganVerifikasiBerkas: z.string(),
});

type FormData = z.infer<typeof formSchema>;

function FormVerifikasiBerkas({ cuti, session }: FormVerifikasiBerkasProps) {
  const { mutate: submitDataVerifikasiBerkas, isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      const payload: verifikasiBerkasPayload = {
        idCuti: cuti.idCuti,
        idJenisCuti: cuti.idJenisCuti,
        nipVerifikator: session.user.nip!,
        idVerifikator: session.user.id,
        berkasCuti: +data.berkasCuti,
        tanggalVerifikasi: new Date().toDateString(),
        suratPermintaanCuti: +data.suratPermintaanCuti,
        formulirCuti: +data.formulirCuti,
        beritaAcaraCuti: +data.beritaAcaraCuti,
        keteranganVerifikasiBerkas: data.keteranganVerifikasiBerkas,
      };
      const { data: responseData } = await axios.post(
        "/api/verifikator/verifikasi",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return responseData;
    },
    onSuccess: ({ data }) => {
      // Not re-render yet but uncomment later
      // router.push('/verifikator/status-verifikasi')
      // window.location.href = "/verifikator/status-verifikasi";

      const encryptedId = encryptId(String(data.id));
      console.log(encryptedId);
      // console.log(`http://localhost:3000/verifikasi-atasan/${encryptedId}`);
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      suratPermintaanCuti: "",
      formulirCuti: "",
      beritaAcaraCuti: "",
      keteranganVerifikasiBerkas: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    submitDataVerifikasiBerkas(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Card>
          <CardHeader>
            <CardTitle>Verifikasi Berkas</CardTitle>
            <CardDescription>Verfikasi kelengkapan berkas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="suratPermintaanCuti"
              render={({ field: { onChange, onBlur, name, value } }) => (
                <FormItem>
                  <FormLabel>1. Surat Permintaan Cuti</FormLabel>
                  <RadioGroup
                    defaultValue={value}
                    onValueChange={onChange}
                    onBlur={onBlur}
                    name={name}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="permintaan1" />
                      <Label htmlFor="permintaan1" className="font-normal">
                        Belum Dicek
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="permintaan2" />
                      <Label htmlFor="permintaan2" className="font-normal">
                        Ada
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="permintaan3" />
                      <Label htmlFor="permintaan3" className="font-normal">
                        Tidak Ada
                      </Label>
                    </div>
                  </RadioGroup>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="formulirCuti"
              render={({ field: { onChange, onBlur, name, value } }) => (
                <FormItem>
                  <FormLabel>
                    2. Formulir Permintaan dan Pemberian Cuti
                  </FormLabel>
                  <RadioGroup
                    defaultValue={value}
                    onValueChange={onChange}
                    onBlur={onBlur}
                    name={name}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="permintaan1" />
                      <Label htmlFor="formulir1" className="font-normal">
                        Belum Dicek
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="permintaan2" />
                      <Label htmlFor="formulir2" className="font-normal">
                        Ada
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="permintaan3" />
                      <Label htmlFor="formulir3" className="font-normal">
                        Tidak Ada
                      </Label>
                    </div>
                  </RadioGroup>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="beritaAcaraCuti"
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>3. Surat Permintaan Cuti</FormLabel>
                  <RadioGroup
                    defaultValue={value}
                    onValueChange={onChange}
                    onBlur={onBlur}
                    name={name}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="berita1" />
                      <Label htmlFor="berita1" className="font-normal">
                        Belum Dicek
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="berita2" />
                      <Label htmlFor="berita2" className="font-normal">
                        Ada
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="berita3" />
                      <Label htmlFor="berita3" className="font-normal">
                        Tidak Ada
                      </Label>
                    </div>
                  </RadioGroup>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="berkasCuti"
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>4. Berkas Cuti</FormLabel>
                  <RadioGroup
                    defaultValue={value}
                    onValueChange={onChange}
                    onBlur={onBlur}
                    name={name}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="berita1" />
                      <Label htmlFor="berita1" className="font-normal">
                        Belum Dicek
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="berita2" />
                      <Label htmlFor="berita2" className="font-normal">
                        Ada
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="berita3" />
                      <Label htmlFor="berita3" className="font-normal">
                        Tidak Ada
                      </Label>
                    </div>
                  </RadioGroup>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keteranganVerifikasiBerkas"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Keterangan Verifikasi</FormLabel>
                  <Textarea
                    placeholder="Tulis alasan cuti Anda"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                  />
                </FormItem>
              )}
            />

            <Separator orientation="horizontal" />
            <Button disabled={isLoading} type="submit">
              {isLoading && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}{" "}
              Submit
            </Button>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}

export default FormVerifikasiBerkas;
