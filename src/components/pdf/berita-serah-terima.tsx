import * as React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const BeritaSerahTerima = () => {
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
      width: "60%",
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
      marginBottom: 50,
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
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.group1}>
          <Text style={styles.fontBold}>BERITA ACARA</Text>
          <Text style={styles.fontBold}>SERAH TERIMA TUGAS</Text>
        </View>
        <Text style={styles.textOpening}>
          Pada hari ini tanggal 13 Juni 2023 yang bertanda tangan dibawah ini:
        </Text>
        <View>
          <View style={styles.detail}>
            <Text>Nama</Text>
            <Text style={styles.textDetailRight}>: Yusuf Donny</Text>
          </View>
          <View style={styles.detail}>
            <Text>NIP</Text>
            <Text style={styles.textDetailRight}>: 08123322</Text>
          </View>
          <View style={styles.detail}>
            <Text>Pangkat/Golongan</Text>
            <Text style={styles.textDetailRight}>: Staf Perlengkapan</Text>
          </View>
          <View style={styles.detail}>
            <Text>Jabatan</Text>
            <Text style={styles.textDetailRight}>: Staf</Text>
          </View>
          <Text style={styles.marginBottom}>
            Selanjutnya disebut Pihak Pertama
          </Text>
        </View>
        <View>
          <View style={styles.detail}>
            <Text>Nama</Text>
            <Text style={styles.textDetailRight}>: Egy Maulana</Text>
          </View>
          <View style={styles.detail}>
            <Text>NIP</Text>
            <Text style={styles.textDetailRight}>: 563453434</Text>
          </View>
          <View style={styles.detail}>
            <Text>Pangkat/Golongan</Text>
            <Text style={styles.textDetailRight}>: Staf Keungan</Text>
          </View>
          <View style={styles.detail}>
            <Text>Jabatan</Text>
            <Text style={styles.textDetailRight}>: Staf</Text>
          </View>
          <Text style={styles.marginBottom}>
            Selanjutnya disebut Pihak Pertama
          </Text>
        </View>
        <View>
          <Text style={styles.marginBottom}>
            Sehubungan Pihak Pertama menjalani cuti tahunan selama 4 (empat)
            hari kerja, terhitung mulai tanggal 05 Juli 2022, maka Pihak Pertama
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
            </View>
            <View style={styles.signCenter}>
              <Text>Egy Maulana, S. Si</Text>
              <Text>NIP 430020821</Text>
            </View>
          </View>
          <View>
            <View style={styles.marginBottomSign}>
              <Text>Yang Menerima</Text>
              <Text>Pihak Kedua,</Text>
            </View>
            <View style={styles.signCenter}>
              <Text>Egy Maulana, S. Si</Text>
              <Text>NIP 430020821</Text>
            </View>
          </View>
        </View>

        <View style={styles.flexSign}>
          <View>
            <View style={styles.marginBottomSign}>
              <Text>Mengetahui</Text>
              <Text>Subbag : Tata Usaha</Text>
            </View>
            <View style={styles.signCenter}>
              <Text>Sumarno</Text>
              <Text>NIP 430020821</Text>
            </View>
          </View>
          <View>
            <View style={styles.marginBottomSign}>
              <Text>Menyetujui,</Text>
              <Text>Kepala Balai,</Text>
            </View>
            <View style={styles.signCenter}>
              <Text>drh. dasdadasdas</Text>
              <Text>NIP 430020821</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default BeritaSerahTerima;
