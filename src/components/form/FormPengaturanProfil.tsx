"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import React from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/Icons";

import { ProfilPayload } from "@/lib/validators/karyawan/profil";
import { toast } from "@/hooks/use-toast";
import SignatureCanvas from "react-signature-canvas";
import ReactSignatureCanvas from "react-signature-canvas";
import { Skeleton } from "@/components/ui/Skeleton";

import { useRouter } from "next/navigation";
import { RolePengguna } from "@prisma/client";

import { DevTool } from "@hookform/devtools";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { CustomCalendar } from "../ui/custom/CustomCalendar";
import id from "date-fns/locale/id";

const formSchema = z.object({
  namaLengkap: z.string(),
  nip: z.string(),
  idJabatan: z.string().optional(),
  tanggalLahir: z.string(),
  tempatLahir: z.string(),
  jenisKelamin: z.string(),
  tandaTangan: z.string(),
});

type FormData = z.infer<typeof formSchema>;

interface FormPengarutanProfilProps {
  user: {
    id: number;
    role: RolePengguna | null;
    setup: number;
  };
}

export default function FormPengaturanProfil({
  user,
}: FormPengarutanProfilProps) {
  const router = useRouter();

  const [signature, setSignature] = React.useState<ReactSignatureCanvas | null>(
    null
  );
  const [signatureDataUrl, setSignatureDataUrl] = React.useState<
    string | undefined
  >("");
  const [date, setDate] = React.useState<Date | undefined>();

  const { mutate: submitProfil, isLoading: isLoadingSubmit } = useMutation({
    mutationFn: async (data: FormData) => {
      const jabatan = data.idJabatan ? +data.idJabatan : undefined;
      const payload: ProfilPayload = {
        id: user.id,
        namaLengkap: data.namaLengkap,
        nip: data.nip,
        idJabatan: jabatan,
        tempatLahir: data.tempatLahir,
        tanggalLahir: data.tanggalLahir,
        jenisKelamin: data.jenisKelamin,
        tandaTangan: data.tandaTangan,
      };

      const response = await axios.post("/api/profil", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onError: () => {
      toast({
        title: "Gagal memperbarui profil!",
        description: "Profil gagal diperbarui, coba lagi nanti.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.push(`/${user.role}`);
    },
  });

  const { data: dataJabatan, isLoading: isDataJabatanLoading } = useQuery({
    queryKey: ["dataJabatan"],
    queryFn: async () => {
      const { data } = await axios.get("/api/karyawan/data-jabatan");
      return data.result;
    },
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: async () => {
      const { data } = await axios.get("/api/profil", {
        params: { id: user.id },
      });

      if (data.result.tandaTangan) {
        setSignatureDataUrl(data.result.tandaTangan);
      }
      form.setValue("tandaTangan", data.result.tandaTangan);

      setDate(new Date(data.result.tanggalLahir));
      return data.result;
    },
  });

  const {
    formState: { isLoading },
  } = form;

  React.useEffect(() => {
    if (signatureDataUrl) {
      if (signature) {
        signature.fromDataURL(signatureDataUrl);

        const point = signature!.toData();
        signature.fromData(point);
      }
    }
  }, [signatureDataUrl, signature]);

  const clearSignatureHandler = () => {
    signature?.clear();

    setSignatureDataUrl("");
  };

  const signatureDataHandler = () => {
    const data = signature?.toDataURL("image/png");

    setSignatureDataUrl((prev) => data);
  };

  React.useEffect(() => {
    if (signatureDataUrl) {
      form.setValue("tandaTangan", signatureDataUrl, { shouldDirty: true });
    }
  }, [signatureDataUrl, form]);

  const onSubmit = async (data: FormData) => {
    submitProfil(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <Card>
            <CardHeader>
              <CardTitle>Profil Pengguna</CardTitle>
              <CardDescription>
                Lengkapi data diri Anda sebelum mengajukan cuti
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="namaLengkap"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama lengkap</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <Skeleton className="w-full h-10 border" />
                      ) : (
                        <Input
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          value={field.value}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nip"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NIP</FormLabel>
                    <FormControl>
                      {isLoading ? (
                        <Skeleton className="w-full h-10 border" />
                      ) : (
                        <Input
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          value={field.value}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="idJabatan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          {isLoading ? (
                            <Skeleton className="w-full h-10 border" />
                          ) : (
                            <SelectTrigger onBlur={field.onBlur}>
                              <SelectValue placeholder="Pilih jabatan" />
                            </SelectTrigger>
                          )}
                        </FormControl>
                        <SelectContent
                          ref={(ref) => {
                            if (!ref) return;
                            ref.ontouchstart = (e) => {
                              e.preventDefault();
                            };
                          }}
                        >
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
                    <small className="text-muted-foreground">
                      Lewati pilihan jabatan apabila opsi pilihan tidak muncul
                    </small>
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 space-y-4 2xl:grid 2xl:grid-cols-2 2xl:gap-6 2xl:space-y-0">
                <FormField
                  control={form.control}
                  name="tempatLahir"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempat lahir</FormLabel>
                      <FormControl>
                        {isLoading ? (
                          <Skeleton className="w-full h-10 border" />
                        ) : (
                          <Input
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            value={field.value}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tanggalLahir"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal lahir</FormLabel>
                      <FormControl>
                        {isLoading ? (
                          <Skeleton className="w-full h-10 border" />
                        ) : (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="w-4 h-4 mr-2" />
                                {date ? (
                                  format(date, "PPP", { locale: id })
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start" className="p-0">
                              <CustomCalendar
                                mode="single"
                                captionLayout="dropdown-buttons"
                                // @ts-ignore
                                selected={date}
                                onSelect={(selected) => {
                                  console.log(field.value);
                                  if (selected)
                                    field.onChange(selected.toDateString());
                                  setDate(selected);
                                }}
                                initialFocus
                                fromYear={1900}
                                toYear={2023}
                                onDayBlur={field.onBlur}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="jenisKelamin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis kelamin</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        {isLoading ? (
                          <Skeleton className="w-full h-10 border" />
                        ) : (
                          <SelectTrigger onBlur={field.onBlur}>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                        )}
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pria">Pria</SelectItem>
                        <SelectItem value="wanita">Wanita</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="tandaTangan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tanda tangan</FormLabel>
                    <div className="flex flex-col items-start gap-4 lg:flex lg:items-center lg:flex-row lg:gap-4">
                      <FormControl>
                        <div className="relative h-[150px] w-full xs:w-[350px]">
                          {isLoading ? (
                            <Skeleton className="absolute w-full h-full border rounded-lg" />
                          ) : (
                            <SignatureCanvas
                              onBegin={field.onBlur}
                              penColor="black"
                              ref={(data) => setSignature(data)}
                              backgroundColor="#ffffff"
                              clearOnResize={false}
                              canvasProps={{
                                className:
                                  "border rounded-lg absolute w-full h-full",
                              }}
                            />
                          )}
                        </div>
                      </FormControl>
                      <div className="flex gap-4">
                        <Button
                          onClick={clearSignatureHandler}
                          type="button"
                          variant="destructive"
                        >
                          Reset
                        </Button>
                        <Button
                          onClick={signatureDataHandler}
                          type="button"
                          variant="secondary"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                    <small className="text-muted-foreground">
                      Klik save terlebih dahulu untuk menyimpan data tanda
                      tangan
                    </small>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button
                disabled={isLoadingSubmit || !signatureDataUrl}
                type="submit"
              >
                {isLoadingSubmit && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}{" "}
                Submit
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <DevTool control={form.control} />
    </>
  );
}
