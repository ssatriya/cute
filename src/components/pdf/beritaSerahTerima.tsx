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

import { longDateFormat } from "@/lib/dateFormat";

import header from "../../../public/images/header.gif";

interface BeritaSerahTerimaProps {
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
    namaPengganti: string;
    nipPengganti: string;
    jabatanPengganti: string;
    tandaTanganPengganti: string;
  };
}

const BeritaSerahTerima = ({ data }: BeritaSerahTerimaProps) => {
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
      flexDirection: "column",
      alignItems: "center",
    },
    fontBold: {
      fontWeight: "bold",
    },
    textOpening: {
      marginTop: 35,
      marginBottom: 15,
    },
    detail: {
      width: "70%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    textDetailRight: {
      width: "40%",
    },
    marginBottom: {
      marginBottom: 10,
    },
    marginBottomSign: {
      flexDirection: "column",
      alignItems: "center",
    },
    flexSign: {
      flexDirection: "row",
      gap: 200,
      marginTop: 50,
      justifyContent: "center",
    },
    signCenter: {
      flexDirection: "column",
      alignItems: "center",
    },
    signImage: {
      width: "180",
    },
  });

  return (
    <PDFViewer className="w-full h-full">
      <Document>
        <Page style={styles.page}>
          <View style={styles.group1}>
            <Text style={styles.fontBold}>BERITA ACARA</Text>
            <Text style={styles.fontBold}>SERAH TERIMA TUGAS</Text>
          </View>
          <Text style={styles.textOpening}>
            Pada hari ini tanggal{" "}
            {longDateFormat(new Date(data.tanggalPengajuan))} yang bertanda
            tangan dibawah ini:
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
              <Text>Pangkat/Golongan</Text>
              <Text style={styles.textDetailRight}>: Staf Perlengkapan</Text>
            </View>
            <View style={styles.detail}>
              <Text>Jabatan</Text>
              <Text style={styles.textDetailRight}>: {data.namaJabatan}</Text>
            </View>
            <Text style={styles.marginBottom}>
              Selanjutnya disebut Pihak Pertama
            </Text>
          </View>
          <View>
            <View style={styles.detail}>
              <Text>Nama</Text>
              <Text style={styles.textDetailRight}>: {data.namaPengganti}</Text>
            </View>
            <View style={styles.detail}>
              <Text>NIP</Text>
              <Text style={styles.textDetailRight}>: {data.nipPengganti}</Text>
            </View>
            <View style={styles.detail}>
              <Text>Pangkat/Golongan</Text>
              <Text style={styles.textDetailRight}>: Staf Keungan</Text>
            </View>
            <View style={styles.detail}>
              <Text>Jabatan</Text>
              <Text style={styles.textDetailRight}>
                : {data.jabatanPengganti}
              </Text>
            </View>
            <Text style={styles.marginBottom}>
              Selanjutnya disebut Pihak Pertama
            </Text>
          </View>
          <View>
            <Text style={styles.marginBottom}>
              Sehubungan Pihak Pertama menjalani cuti tahunan selama{" "}
              {data.lamaCuti} (empat) hari kerja, terhitung mulai tanggal{" "}
              {longDateFormat(new Date(data.tanggalMulai))}, maka Pihak Pertama
              menyerahkan tugas dan tanggung jawabnya kepada Pihak Kedua, dan
              Pihak Kedua telah menerima dengan baik.
            </Text>
            <Text>
              Demikianlah Berita Acara Serah Terima Tugas ini dibuat untuk dapat
              dipergunakan sebagaimana mestinya.
            </Text>
          </View>
          <View style={styles.flexSign}>
            <View>
              <View style={styles.marginBottomSign}>
                <Text>Yang Menerima</Text>
                <Text>Pihak Kedua,</Text>
                {/* eslint-disable-next-line */}
                <Image
                  style={styles.signImage}
                  src={data.tandaTanganPengganti}
                />
              </View>
              <View style={styles.signCenter}>
                <Text>{data.namaPengganti}</Text>
                <Text>NIP {data.nipPengganti}</Text>
              </View>
            </View>
            <View>
              <View style={styles.marginBottomSign}>
                <Text>Yang Menerima</Text>
                <Text>Pihak Pertama,</Text>
                {/* eslint-disable-next-line */}
                <Image style={styles.signImage} src={data.tandaTangan} />
              </View>
              <View style={styles.signCenter}>
                <Text>{data.namaLengkap}</Text>
                <Text>NIP {data.nip}</Text>
              </View>
            </View>
          </View>

          <View style={styles.flexSign}>
            <View>
              <View style={styles.marginBottomSign}>
                <Text>Mengetahui</Text>
                <Text>Subbag : Tata Usaha</Text>
                {/* eslint-disable-next-line */}
                <Image style={styles.signImage} src={data.tandaTanganAtasan} />
              </View>
              <View style={styles.signCenter}>
                <Text>{data.namaAtasan}</Text>
                <Text>NIP {data.nipAtasan}</Text>
              </View>
            </View>
            <View>
              <View style={styles.marginBottomSign}>
                <Text>Menyetujui,</Text>
                <Text>Kepala Balai,</Text>
                {/* eslint-disable-next-line */}
                <Image style={styles.signImage} src={data.tandaTanganKepala} />
              </View>
              <View style={styles.signCenter}>
                <Text>{data.namaKepala}</Text>
                <Text>NIP {data.nipKepala}</Text>
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default BeritaSerahTerima;
