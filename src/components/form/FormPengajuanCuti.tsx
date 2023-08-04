"use client";

import React, { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DateRange } from "react-day-picker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import axios from "axios";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/Calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { toast } from "@/hooks/use-toast";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "@/components/ui/Textarea";
import { Icons } from "@/components/Icons";
import { Session } from "next-auth";
import { CustomDropzoneUploadthing } from "../CustomDropzoneUploadthing";

import { encryptId } from "@/lib/crypto";
import id from "date-fns/locale/id";
import { Skeleton } from "../ui/Skeleton";

const arrZ = z.object({
  fileKey: z.string(),
  fileUrl: z.string(),
});

const formSchema = z.object({
  jenisCuti: z.string({
    required_error: "Jenis cuti harus dipilih",
  }),
  // tanggalCuti: z.object(
  //   {
  //     from: z.date(),
  //     to: z.date(),
  //   },
  //   {
  //     required_error: "Tanggal awal dan akhir cuti harus dipilih",
  //   }
  // ),
  tanggalMulai: z.date(),
  tanggalSelesai: z.date(),
  keteranganCuti: z.string({
    required_error: "Keterangan cuti harus diisi",
  }),
  alamatSelamaCuti: z.string({
    required_error: "Alamat selama cuti harus diisi",
  }),
  pegawaiPengganti: z.string({
    required_error: "Pegawai pengganti harus diisi",
  }),
  berkas: z.any(),
});

type FormData = z.infer<typeof formSchema>;

interface FormPengajuanCutiProps extends Omit<Session, "expires"> {}

export default function FormPengajuanCuti({ user }: FormPengajuanCutiProps) {
  const router = useRouter();
  // const [date, setDate] = useState<DateRange | undefined>({
  //   from: undefined,
  //   to: undefined,
  // });
  const [dateFrom, setDateFrom] = React.useState<Date>();
  const [dateTo, setDateTo] = React.useState<Date>();

  const { data: dataJenisCuti, isLoading: isLoadingJenisCuti } = useQuery({
    queryKey: ["jenisCuti"],
    queryFn: async () => {
      const { data } = await axios.get("/api/karyawan/data-cuti");
      return data;
    },
  });

  const { data: dataPengganti, isLoading: isLoadingPengganti } = useQuery({
    queryKey: ["pegawaiPengganti"],
    queryFn: async () => {
      const { data } = await axios.get("/api/karyawan/data-pengganti", {
        params: { id: user.id },
      });
      return data;
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const [fileData, setFileData] = useState<
    {
      fileKey: string;
      fileUrl: string;
    }[]
  >([]);

  const { mutate: submitPengajuan, isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      const formData = new FormData();

      formData.append("jenisCuti", data.jenisCuti),
        formData.append("tanggalMulai", data.tanggalMulai.toISOString());
      formData.append("tanggalSelesai", data.tanggalSelesai.toISOString());
      formData.append("keteranganCuti", data.keteranganCuti);
      formData.append("alamatSelamaCuti", data.alamatSelamaCuti);
      formData.append("berkas", JSON.stringify(fileData));
      formData.append("pegawaiPengganti", data.pegawaiPengganti);

      // session data
      formData.append("nip", user.nip!);
      formData.append("namaLengkap", user.namaLengkap!);
      formData.append("idPengguna", user.id);

      const { data: responseData } = await axios.post(
        "/api/karyawan/pengajuan-cuti",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return responseData;
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Could not submit, try again later.",
        variant: "destructive",
      });
    },
    onSuccess: ({ data }) => {
      // router.push("/karyawan/riwayat-cuti");
      const encryptedId = encryptId(String(data.id));
      console.log(encryptedId);
      console.log(`http://localhost:3000/pegawai-pengganti/${encryptedId}`);
    },
  });

  const onSubmit = async (data: FormData) => {
    submitPengajuan(data);
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
            <CardTitle className="text-xl xs:text-2xl">
              Formulir Pengajuan Cuti
            </CardTitle>
            <CardDescription>
              Isi formulir dengan data yang diperlukan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="jenisCuti"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis cuti</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      {isLoadingJenisCuti ? (
                        <Skeleton className="w-full h-10 border" />
                      ) : (
                        <SelectTrigger>
                          <span
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                            className="font-normal text-muted-foreground"
                          >
                            <SelectValue placeholder="Pilih jenis cuti" />
                          </span>
                        </SelectTrigger>
                      )}
                    </FormControl>
                    <SelectContent>
                      {dataJenisCuti &&
                        dataJenisCuti.result.map((cuti: any) => (
                          <SelectItem key={cuti.id} value={String(cuti.id)}>
                            {cuti.namaCuti}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 space-y-4 2xl:grid 2xl:grid-cols-2 2xl:gap-6 2xl:space-y-0">
              <FormField
                control={form.control}
                name="tanggalMulai"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <FormItem>
                    <FormLabel>Tanggal mulai</FormLabel>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dateFrom && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {dateFrom ? (
                              format(dateFrom, "PPP", { locale: id })
                            ) : (
                              <span>Pilih tanggal mulai</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dateFrom}
                            onSelect={(selected) => {
                              // @ts-ignore
                              onChange(selected);
                              setDateFrom(selected);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggalSelesai"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <FormItem>
                    <FormLabel>Tanggal selesai</FormLabel>
                    <div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !dateTo && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {dateTo ? (
                              format(dateTo, "PPP", { locale: id })
                            ) : (
                              <span>Pilih tanggal selesai</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={dateTo}
                            // onSelect={(selected) => {
                            //   // @ts-ignore
                            //   onChange(selected);
                            //   setDate(selected);
                            // }}
                            onSelect={(selected) => {
                              // @ts-ignore
                              onChange(selected);
                              setDateTo(selected);
                            }}
                            disabled={(date) => date < dateFrom!}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 space-y-4 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
              <FormField
                control={form.control}
                name="keteranganCuti"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <FormItem>
                    <FormLabel>Keterangan</FormLabel>
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

              <FormField
                control={form.control}
                name="alamatSelamaCuti"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value, name } }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <Textarea
                      placeholder="Tulis alamat Anda selama cuti"
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value}
                      name={name}
                    />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="berkas"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, name, value } }) => (
                <FormItem>
                  <FormLabel>Berkas</FormLabel>
                  <FormControl>
                    <CustomDropzoneUploadthing
                      setFileData={(fileData) =>
                        setFileData((prev) => prev.concat(fileData))
                      }
                      fileData={fileData}
                    />
                  </FormControl>
                  <small className="block text-muted-foreground">
                    Berkas cuti tidak perlu dilengkapi apabila memilih Cuti
                    Tahunan
                  </small>
                  <small className="block text-muted-foreground">
                    Klik upload file dan pastikan proses upload berhasil
                    terlebih dahulu sebelum mengirim permohonan cuti.
                  </small>
                </FormItem>
              )}
            />
            {/* Broke this */}
            {/* 
            <FormField
              control={form.control}
              name="berkas"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, name } }) => (
                <FormItem>
                  <FormLabel>Berkas</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      id="berkas"
                      ref={berkasRef}
                      onChange={onChange}
                      onBlur={onBlur}
                      name={name}
                    />
                  </FormControl>
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name="pegawaiPengganti"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, name } }) => (
                <FormItem>
                  <FormLabel>Pegawai pengganti</FormLabel>
                  <Select
                    onValueChange={onChange}
                    defaultValue={value}
                    name={name}
                  >
                    <FormControl>
                      {isLoadingPengganti ? (
                        <Skeleton className="w-full h-10 border" />
                      ) : (
                        <SelectTrigger onBlur={onBlur}>
                          <span
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                            className="font-normal text-muted-foreground"
                          >
                            <SelectValue placeholder="Pilih pegawai pengganti" />
                          </span>
                        </SelectTrigger>
                      )}
                    </FormControl>
                    <SelectContent>
                      {dataPengganti &&
                        dataPengganti.result.map((pegawai: any) => (
                          <SelectItem
                            key={pegawai.id}
                            value={String(pegawai.id)}
                          >
                            {pegawai.namaLengkap}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
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
