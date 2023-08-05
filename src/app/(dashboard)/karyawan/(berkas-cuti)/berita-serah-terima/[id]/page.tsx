import React from "react";
import dynamic from "next/dynamic";
import { Metadata } from "next/types";
import { db } from "@/lib/db";

interface BeritaSerahTerimaProps {
  params: {
    id: string;
  };
}

const BeritaSerahTerimaRender = dynamic(
  () => import("@/components/pdf/beritaSerahTerima"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Berita Serah Terima",
};

export default async function BeritaSerahTerima({
  params,
}: BeritaSerahTerimaProps) {
  const id = params.id;

  const numberId = parseInt(id, 10);
  const dataCuti = await db.cuti.findUnique({
    select: {
      nip: true,
      namaLengkap: true,
      tanggalPengajuan: true,
      keterangan: true,
      alamatSelamaCuti: true,
      lamaCuti: true,
      tanggalMulai: true,
      verifikasiAtasan: {
        select: {
          atasan: {
            select: {
              namaLengkap: true,
              tandaTangan: true,
              nip: true,
            },
          },
        },
      },
      verifikasiKepala: {
        select: {
          kepala: {
            select: {
              namaLengkap: true,
              tandaTangan: true,
              nip: true,
            },
          },
        },
      },
      pemohon: {
        select: {
          tandaTangan: true,
          jabatan: {
            select: {
              namaJabatan: true,
              bagian: {
                select: {
                  atasan: {
                    select: {
                      id: true,
                      namaLengkap: true,
                      nip: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
      pengganti: {
        select: {
          namaLengkap: true,
          nip: true,
          tandaTangan: true,
          jabatan: {
            select: {
              namaJabatan: true,
            },
          },
        },
      },
    },
    where: {
      id: numberId,
    },
  });

  if (!dataCuti) {
    return <p>Data not found</p>;
  }

  return (
    <BeritaSerahTerimaRender
      data={{
        nip: dataCuti.nip,
        namaLengkap: dataCuti.namaLengkap,
        tandaTangan: dataCuti.pemohon.tandaTangan!,
        tanggalPengajuan: dataCuti.tanggalPengajuan,
        keterangan: dataCuti.keterangan,
        alamatSelamaCuti: dataCuti.alamatSelamaCuti,
        lamaCuti: dataCuti.lamaCuti,
        tanggalMulai: dataCuti.tanggalMulai,
        namaKepala: dataCuti.verifikasiKepala?.kepala.namaLengkap!,
        tandaTanganKepala: dataCuti.verifikasiKepala?.kepala.tandaTangan!,
        nipKepala: dataCuti.verifikasiKepala?.kepala.nip!,
        namaAtasan: dataCuti.verifikasiAtasan?.atasan.namaLengkap!,
        tandaTanganAtasan: dataCuti.verifikasiAtasan?.atasan.nip!,
        nipAtasan: dataCuti.verifikasiAtasan?.atasan.nip!,
        namaJabatan: dataCuti.pemohon.jabatan?.namaJabatan!,
        namaPengganti: dataCuti.pengganti.namaLengkap!,
        nipPengganti: dataCuti.pengganti.nip!,
        jabatanPengganti: dataCuti.pengganti.jabatan?.namaJabatan!,
        tandaTanganPengganti: dataCuti.pengganti.tandaTangan!,
      }}
    />
  );
}
