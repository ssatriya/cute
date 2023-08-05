"use client";

import * as React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import { format } from "date-fns";

interface PDFSuratPermintaanCutiProps {
  data: {
    nip: string;
    namaLengkap: string;
    tandaTangan: string;
    tanggalPengajuan: Date;
    keterangan: string;
    alamatSelamaCuti: string;
    lamaCuti: number;
    tanggalMulai: Date;
    namaKepala: string;
    tandaTanganKepala: string;
    nipKepala: string;
    namaAtasan: string;
    tandaTanganAtasan: string;
    nipAtasan: string;
    namaJabatan: string;
    dataCuti: {
      cutiTahunan?: {
        namaCuti: string;
        sisaCuti: number;
        lamaCuti: number;
      };
      cutiBesar?: {
        namaCuti: string;
        sisaCuti: number;
        lamaCuti: number;
      };
      cutiSakit?: {
        namaCuti: string;
        sisaCuti: number;
        lamaCuti: number;
      };
      cutiBersalin?: {
        namaCuti: string;
        sisaCuti: number;
        lamaCuti: number;
      };
      cutiAlasanPenting?: {
        namaCuti: string;
        sisaCuti: number;
        lamaCuti: number;
      };
    };
  };
}

const SuratPermintaanCuti = ({ data }: PDFSuratPermintaanCutiProps) => {
  const styles = StyleSheet.create({
    imageHeader: {
      width: 556,
    },
    page: {
      padding: 20,
      fontSize: 10,
      lineHeight: 1.2,
    },
    group1: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    textDate: {
      marginRight: 38,
    },
    group2: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      marginTop: 40,
    },
    beforeDetail: {
      marginTop: 40,
    },
    detail: {
      width: "60%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    textDetailRight: {
      width: "50%",
    },
    paragraph1: {
      marginTop: 15,
    },
    paragraph2: {
      marginTop: 15,
    },
    sign: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "flex-start",
      marginTop: 40,
      // marginRight: 100,
    },
    signColumn: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "80",
    },
    signImage: {
      width: "180",
      // marginLeft: "30",
    },
    // ============================
    body: {
      padding: 10,
    },
    table: {
      marginTop: 30,
      // @ts-ignore
      display: "table",
      width: "auto",
      borderStyle: "solid",
      borderColor: "#000",
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
    },
    tableRow: {
      margin: "auto",
      flexDirection: "row",
    },
    tableColHeaderNormal: {
      width: "35%",
      borderStyle: "solid",
      borderColor: "#000",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableColHeaderSpan: {
      width: "65%",
      borderStyle: "solid",
      borderColor: "#000",
      borderBottomColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableColNormal: {
      width: "35%",
      borderStyle: "solid",
      borderColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableColSpan: {
      width: "65%",
      borderStyle: "solid",
      borderColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableColDivided: {
      width: "32.5%",
      borderStyle: "solid",
      borderColor: "#000",
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
  });

  const formatTanggal = format(new Date(data.tanggalPengajuan), "MM/dd/yyyy");

  return (
    <PDFViewer className="w-full h-full">
      <Document>
        <Page style={styles.page}>
          {/* <Image style={styles.imageHeader} src={``} /> */}
          <View style={styles.group1}>
            <Text>Perihal : Permintaan Cuti Tahunan</Text>
            <Text style={styles.textDate}>Banjarbaru, {formatTanggal}</Text>
          </View>
          <View style={styles.group2}>
            <View>
              <Text>Kepada Yth:</Text>
              <Text>Kepala Balai Veteriner Banjarbaru</Text>
              <Text>di Tempat</Text>
            </View>
          </View>
          <Text style={styles.beforeDetail}>
            Yang bertanda tangan di bawah ini:
          </Text>
          <View>
            <View style={styles.detail}>
              <Text>Nama</Text>
              <Text style={styles.textDetailRight}>: {data.namaLengkap}</Text>
            </View>
            <View style={styles.detail}>
              <Text>NIP</Text>
              <Text style={styles.textDetailRight}>: {data.nip}</Text>
            </View>
            <View style={styles.detail}>
              <Text>Pangkat/Gol. Ruangan</Text>
              <Text style={styles.textDetailRight}>: Staf Perlengkapan</Text>
            </View>
            <View style={styles.detail}>
              <Text>Jabatan</Text>
              <Text style={styles.textDetailRight}>: {data.namaJabatan}</Text>
            </View>
            <View style={styles.detail}>
              <Text>Satuan Organisasi</Text>
              <Text style={styles.textDetailRight}>
                : Balai Veteriner Banjarbaru
              </Text>
            </View>
            <View style={styles.detail}>
              <Text>Alasan Cuti</Text>
              <Text style={styles.textDetailRight}>:{data.keterangan}</Text>
            </View>
            <View style={styles.detail}>
              <Text>Nomor Telepon</Text>
              <Text style={styles.textDetailRight}>: 08123123213</Text>
            </View>
          </View>
          <View>
            <View style={styles.paragraph1}>
              <Text>
                Dengan ini mengajukan permintaan cuti tahunan untuk tahun 2023
                selama {data.lamaCuti} (placeholder angka terbilang) hari kerja,
                terhitung mulai tanggal 05 Juli 2022.
              </Text>
            </View>
            <View style={styles.paragraph2}>
              <Text>
                Selama menjalankan cuti alamat saya adalah di{" "}
                {data.alamatSelamaCuti}. Demikianlah permintaan ini saya buat
                untuk dapat dipertimbangkan sebagaimana mestinya.
              </Text>
            </View>
          </View>
          <View style={styles.sign}>
            <View style={styles.signColumn}>
              <Text>Hormat saya,</Text>
              {/* eslint-disable-next-line */}
              <Image style={styles.signImage} src={data.tandaTangan} debug />
              <Text>{data.namaLengkap}</Text>
              <Text>NIP. {data.nip}</Text>
            </View>
          </View>
          {/* ======================== */}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default SuratPermintaanCuti;
