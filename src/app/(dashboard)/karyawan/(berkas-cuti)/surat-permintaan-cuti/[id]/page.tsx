import { db } from "@/lib/db";
import dynamic from "next/dynamic";

import React from "react";
import { Metadata } from "next/types";

interface BerkasCutiProps {
  params: {
    id: string;
  };
}

const SuratPermintaanCutiRender = dynamic(
  () => import("@/components/PDFSuratPermintaanCuti"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Surat Permintaan Cuti",
};

export default async function BerkasCuti({ params }: BerkasCutiProps) {
  const id = params.id;

  if (!id) {
    return <p>Id not found</p>;
  }

  const numberId = parseInt(id, 10);
  const response = await db.cuti.findUnique({
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
    },
    where: {
      id: numberId,
    },
  });

  const sisaCutiN = await db.sisacutin.findMany({
    select: {
      namaCuti: true,
      sisaCuti: true,
      lamaCuti: true,
    },
    where: {
      userId: numberId,
    },
  });

  interface DataCuti {
    cutiTahunan?: {
      namaCuti: string;
      sisaCuti: number;
      lamaCuti: number;
    };
    cutiSakit?: {
      namaCuti: string;
      sisaCuti: number;
      lamaCuti: number;
    };
  }

  let dataCuti: DataCuti = {};
  sisaCutiN.map((cuti) => {
    if (cuti.namaCuti === "Cuti Tahunan 2023") {
      dataCuti.cutiTahunan = {
        namaCuti: cuti.namaCuti,
        sisaCuti: cuti.sisaCuti,
        lamaCuti: cuti.lamaCuti,
      };
    }
    if (cuti.namaCuti === "Cuti Sakit 2023") {
      dataCuti.cutiSakit = {
        namaCuti: cuti.namaCuti,
        sisaCuti: cuti.sisaCuti,
        lamaCuti: cuti.lamaCuti,
      };
    }
  });

  if (!response) {
    return <p>Data not found</p>;
  }

  return (
    <div className="w-full h-full">
      <SuratPermintaanCutiRender
        data={{
          nip: response.nip,
          namaLengkap: response.namaLengkap,
          tandaTangan: response.pemohon.tandaTangan!,
          alamatSelamaCuti: response.alamatSelamaCuti,
          keterangan: response.keterangan,
          lamaCuti: response.lamaCuti,
          namaKepala: response.verifikasiKepala?.kepala.namaLengkap!,
          tandaTanganKepala: response.verifikasiKepala?.kepala.tandaTangan!,
          nipKepala: response.verifikasiKepala?.kepala.nip!,
          namaAtasan: response.verifikasiAtasan?.atasan.namaLengkap!,
          tandaTanganAtasan: response.verifikasiAtasan?.atasan.tandaTangan!,
          nipAtasan: response.verifikasiAtasan?.atasan.nip!,
          tanggalMulai: response.tanggalMulai,
          tanggalPengajuan: response.tanggalPengajuan,
          namaJabatan: response.pemohon.jabatan?.namaJabatan!,
          dataCuti: dataCuti,
        }}
      />
    </div>
  );
}
