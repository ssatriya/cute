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
      VerifikasiAtasan: {
        select: {
          atasanId: {
            select: {
              namaLengkap: true,
              tandaTangan: true,
              nip: true,
            },
          },
        },
      },
      VerifikasiKepala: {
        select: {
          kepalaId: {
            select: {
              namaLengkap: true,
              tandaTangan: true,
              nip: true,
            },
          },
        },
      },
      pemohonId: {
        select: {
          tandaTangan: true,
          jabatanId: {
            select: {
              namaJabatan: true,
              bagianId: {
                select: {
                  atasanId: {
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
          tandaTangan: response.pemohonId.tandaTangan!,
          alamatSelamaCuti: response.alamatSelamaCuti,
          keterangan: response.keterangan,
          lamaCuti: response.lamaCuti,
          namaKepala: response.VerifikasiKepala[0].kepalaId.namaLengkap!,
          tandaTanganKepala: response.VerifikasiKepala[0].kepalaId.tandaTangan!,
          nipKepala: response.VerifikasiKepala[0].kepalaId.nip!,
          namaAtasan: response.VerifikasiAtasan[0].atasanId.namaLengkap!,
          tandaTanganAtasan: response.VerifikasiAtasan[0].atasanId.tandaTangan!,
          nipAtasan: response.VerifikasiAtasan[0].atasanId.nip!,
          tanggalMulai: response.tanggalMulai,
          tanggalPengajuan: response.tanggalPengajuan,
          namaJabatan: response.pemohonId.jabatanId?.namaJabatan!,
          dataCuti: dataCuti,
        }}
      />
    </div>
  );
}
