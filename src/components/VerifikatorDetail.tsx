import React from "react";
import { Card, CardContent } from "./ui/Card";
import { Icons } from "./Icons";

export default function VerifikatorDetail() {
  return (
    <Card>
      <CardContent className="text-sm">
        <div className="pt-6 space-y-4">
          <table className="w-full border">
            <tbody>
              <tr>
                <td className="p-1 text-center">
                  <b>FORMULIR PEMBERIAN CUTI</b>
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full border table-auto">
            <tbody>
              <tr className="border">
                <td className="p-1" colSpan={3}>
                  <b>I. DATA PEGAWAI</b>
                </td>
              </tr>
              <tr className="border">
                <td className="p-1" width="15%">
                  Nama
                </td>
                <td className="p-1" width="40%">
                  Yusuf Donny
                </td>
                <td className="p-1" width="15%">
                  NIP
                </td>
                <td className="p-1" width="30%">
                  123123
                </td>
              </tr>
              <tr className="border">
                <td className="p-1">Jabatan</td>
                <td className="p-1">TKHL</td>
                <td className="p-1">Masa Kerja</td>
                <td className="p-1">24 Tahun 00 Bulan</td>
              </tr>
              <tr className="border">
                <td className="p-1">Unit Kerja</td>
                <td className="p-1">Balai Veteriner Banjarbaru</td>
              </tr>
            </tbody>
          </table>
          <table className="w-full border table-auto">
            <tbody>
              <tr className="border">
                <td className="p-1">
                  <b>II. JENIS CUTI YANG DIAMBIL</b>
                </td>
              </tr>
              <tr className="border">
                <td className="p-1" width="40%">
                  1. Cuti Tahunan
                </td>
                <td className="p-1" width="10%" align="center">
                  <Icons.close />
                </td>
                <td className="p-1" width="40%">
                  2. Cuti Besar
                </td>
                <td className="p-1" width="10%" align="center">
                  <Icons.close />
                </td>
              </tr>
              <tr className="border">
                <td className="p-1">3. Cuti Sakit</td>
                <td className="p-1" align="center">
                  <Icons.check />
                </td>
                <td className="p-1">4. Cuti Melahirkan</td>
                <td className="p-1" align="center">
                  <Icons.close />
                </td>
              </tr>
              <tr className="border">
                <td className="p-1">5. Cuti Karena Alasan Penting</td>
                <td className="p-1" align="center">
                  <Icons.close />
                </td>
                <td className="p-1">6. Cuti di Luar Tanggungan Negara</td>
                <td className="p-1" align="center">
                  <Icons.close />
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full border table-auto">
            <tbody>
              <tr className="border">
                <td className="p-1">
                  <b>III. ALASAN CUTI</b>
                </td>
              </tr>
              <tr className="border">
                <td className="p-1">Keterangan</td>
              </tr>
            </tbody>
          </table>
          <table className="w-full border table-auto">
            <tbody>
              <tr className="border">
                <td className="p-1">
                  <b>IV. LAMANYA CUTI</b>
                </td>
              </tr>
              <tr className="border">
                <td className="p-1" width="20%">
                  Selama
                </td>
                <td className="p-1" width="30%">
                  5 hari
                </td>
                <td className="p-1" width="20%">
                  Mulai Tanggal
                </td>
                <td className="p-1" width="30%">
                  tanggal
                </td>
              </tr>
            </tbody>
          </table>
          <table
            className="w-full border table-auto"
            width="100%"
            cellPadding="1"
            cellSpacing="0"
          >
            <tbody>
              <tr className="border">
                <td className="p-1" colSpan={5}>
                  <b>V. CATATAN CUTI</b>
                </td>
              </tr>
              <tr className="border">
                <td className="p-1" colSpan={3} width="50%">
                  1. CUTI TAHUNAN
                </td>
                <td className="p-1" width="40%">
                  2. BESAR
                </td>
                <td className="p-1" width="10%"></td>
              </tr>
              <tr className="border">
                <td className="p-1" width="10%">
                  Tahun
                </td>
                <td className="p-1" width="30%" align="center">
                  Sisa
                </td>
                <td className="p-1" width="10%" align="center">
                  Keterangan
                </td>
                <td className="p-1">3. CUTI SAKIT</td>
                <td width="10%"></td>
              </tr>
              <tr className="border">
                <td className="p-1">N-2</td>
                <td className="p-1" width="30%" align="center">
                  2
                </td>
                <td className="p-1"></td>
                <td className="p-1">4. CUTI MELAHIRKAN</td>
                <td className="p-1" width="10%"></td>
              </tr>
              <tr className="border">
                <td className="p-1">N-1</td>
                <td className="p-1" width="30%" align="center">
                  3
                </td>
                <td className="p-1"></td>
                <td className="p-1">5. CUTI KARENA ALASAN PENTING</td>
                <td className="p-1" width="10%"></td>
              </tr>
              <tr className="border">
                <td className="p-1">N</td>
                <td className="p-1" width="30%" align="center">
                  5
                </td>
                <td className="p-1"></td>
                <td className="p-1">6. CUTI DI LUAR TANGGUNGAN NEGARA</td>
                <td className="p-1" width="10%"></td>
              </tr>
            </tbody>
          </table>
          <table
            className="w-full border table-auto"
            width="100%"
            cellPadding="1"
            cellSpacing="0"
          >
            <tbody>
              <tr className="border">
                <td className="p-1" colSpan={3}>
                  <b>VI. ALAMAT SELAMA MENJALANKAN CUTI</b>
                </td>
              </tr>
              <tr className="border">
                <td className="p-1" width="50%" rowSpan={6} valign="top">
                  alamat
                </td>
                <td className="p-1" width="16.6%">
                  TELP
                </td>
                <td className="p-1">nohp</td>
              </tr>
              <tr className="border">
                <td className="p-1" colSpan={2} align="center">
                  Hormat Saya
                </td>
              </tr>
              <tr className="border">
                <td className="p-1" colSpan={2}>
                  &nbsp;
                </td>
              </tr>
              <tr className="border">
                <td className="p-1" colSpan={2}>
                  &nbsp;
                </td>
              </tr>
              <tr className="border">
                <td className="p-1" colSpan={2} align="center">
                  (Yusuf Donny)
                </td>
              </tr>
              <tr className="border">
                <td className="p-1" colSpan={2} align="center">
                  NIP. 123123
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
