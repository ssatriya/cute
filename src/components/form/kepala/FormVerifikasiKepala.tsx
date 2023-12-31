"use client";

import { Icons } from "@/components/Icons";
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
} from "@/components/ui/Form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Separator } from "@/components/ui/Separator";
import { Textarea } from "@/components/ui/Textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";

import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { VerifikasiKepalaPayload } from "@/lib/validators/kepala/verifikasiKepala";

const formSchema = z.object({
  statusVerifikasiCuti: z.string(),
  keteranganVerifikasi: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface FormVerifikasiKepalaProps {
  cuti: {
    idCuti: number;
    idJenisCuti: number;
    nip: string;
    namaLengkap: string;
    tanggalMulai: string;
    tanggalSelesai: string;
    lamaCuti: number;
    jenisCuti: string;
    keteranganCuti: string;
    namaPengganti: string;
    nipPengganti: string;
  };
  kepalaDetail: {
    id: number;
    nip: string;
  };
}

export default function FormVerifikasiKepala({
  cuti,
  kepalaDetail,
}: FormVerifikasiKepalaProps) {
  const router = useRouter();

  const { mutate: submitVerifikasiKepala, isLoading } = useMutation({
    mutationFn: async (data: FormData) => {
      const payload: Omit<VerifikasiKepalaPayload, "tanggalVerifikasi"> = {
        idCuti: cuti.idCuti,
        idJenisCuti: cuti.idJenisCuti,
        nipKepala: kepalaDetail.nip,
        idKepala: kepalaDetail.id,
        keteranganVerifikasi: data.keteranganVerifikasi,
        statusVerifikasi: data.statusVerifikasiCuti,
      };
      const { data: returnData } = await axios.post(
        "/api/kepala/verifikasi",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return returnData;
    },
    onError: () => {
      toast({
        title: "Verifikasi gagal!",
        description: "Gagal melakukan verifikasi cuti, coba lagi nanti.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      // Not work yet, uncomment later
      // router.push('/kepala/status-verifikasi')
      window.location.href = "/kepala/status-verifikasi";
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      statusVerifikasiCuti: undefined,
      keteranganVerifikasi: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    submitVerifikasiKepala(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        <Card>
          <CardHeader>
            <CardTitle>Verifikasi Cuti</CardTitle>
            <CardDescription>Verifikasi akhir permohonan cuti</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="statusVerifikasiCuti"
              render={({ field: { onChange, onBlur, name, value } }) => (
                <FormItem>
                  <FormLabel>Pilih status verifikasi</FormLabel>
                  <Select
                    onValueChange={onChange}
                    defaultValue={value}
                    name={name}
                  >
                    <FormControl>
                      <SelectTrigger onBlur={onBlur}>
                        <SelectValue placeholder="Pilih status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="diterima">Diterima</SelectItem>
                      <SelectItem value="ditolak">Ditolak</SelectItem>
                      {/* <SelectItem value="2">Perubahan</SelectItem>
                      <SelectItem value="3">Ditangguhkan</SelectItem> */}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keteranganVerifikasi"
              render={({ field: { onChange, onBlur, name, value } }) => (
                <FormItem>
                  <FormLabel>Keterangan verifikasi</FormLabel>
                  <Textarea
                    placeholder="Tulis keterangan verifikasi bila ada"
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
