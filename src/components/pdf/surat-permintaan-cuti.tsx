import * as React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const SuratPermintaanCuti = () => {
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
      width: "40%",
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
      marginRight: 100,
    },
    signColumn: {
      flexDirection: "column",
    },
    signImage: {
      marginTop: 20,
      marginBottom: 20,
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
    tableColDividedSpanAllWithoutBorderBottom: {
      width: "32.5%",
      height: "auto",
      borderStyle: "solid",
      borderColor: "#000",
      borderRightWidth: 1,
      borderBottomWidth: 0,
    },

    tableColDividedSpanAllWithBorderBottom: {
      width: "32.5%",
      height: "auto",
      borderStyle: "solid",
      borderColor: "#000",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },
    tableColSpanAll: {
      width: "65%",
      height: "auto",
      borderStyle: "solid",
      borderColor: "#000",
      borderRightWidth: 1,
      borderBottomWidth: 0,
    },
    tableColSpanAllWithBorderBottom: {
      width: "65%",
      height: "auto",
      borderStyle: "solid",
      borderColor: "#000",
      borderRightWidth: 1,
      borderBottomWidth: 1,
    },
    tableCellHeader: {
      margin: "auto",
      fontSize: 12,
      fontWeight: 500,
    },
    tableCell: {
      margin: "auto",
      fontSize: 10,
    },
    tableCellAlignLeft: {
      fontSize: 10,
      marginLeft: 6,
      marginRight: 6,
    },
    tableCellHeaderSpan: {
      textAlign: "center",
      margin: "auto",
      fontSize: 10,
    },
    tableCellFlex: {
      flexDirection: "row",
      justifyContent: "space-between",
      fontSize: 10,
      marginRight: 6,
      marginLeft: 6,
    },
    tableCellBig: {
      margin: "auto",
      marginTop: 0,
    },
    tableCellCenter: {
      margin: "auto",
    },
  });

  return (
    <Document>
      <Page style={styles.page}>
        {/* <Image style={styles.imageHeader} src={``} /> */}
        <View style={styles.group1}>
          <Text>Perihal : Permintaan Cuti Tahunan</Text>
          <Text style={styles.textDate}>Banjarbaru, 11 Juni 2023</Text>
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
            <Text style={styles.textDetailRight}>: Yusuf Donny</Text>
          </View>
          <View style={styles.detail}>
            <Text>NIP</Text>
            <Text style={styles.textDetailRight}>: 12093123</Text>
          </View>
          <View style={styles.detail}>
            <Text>Pangkat/Gol. Ruangan</Text>
            <Text style={styles.textDetailRight}>: Staf Perlengkapan</Text>
          </View>
          <View style={styles.detail}>
            <Text>Jabatan</Text>
            <Text style={styles.textDetailRight}>: Staf</Text>
          </View>
          <View style={styles.detail}>
            <Text>Satuan Organisasi</Text>
            <Text style={styles.textDetailRight}>
              : Balai Veteriner Banjarbaru
            </Text>
          </View>
          <View style={styles.detail}>
            <Text>Alasan Cuti</Text>
            <Text style={styles.textDetailRight}>: Istirahat Dirumah</Text>
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
              selama 4 (empat) hari kerja, terhitung mulai tanggal 05 Juli 2022.
            </Text>
          </View>
          <View style={styles.paragraph2}>
            <Text>
              Selama menjalankan cuti alamat saya adalah di Jl. Mentaos Timur,
              No. 18, RT/RW 007/003, Banjarbaru Utara. Demikianlah permintaan
              ini saya buat untuk dapat dipertimbangkan sebagaimana mestinya.
            </Text>
          </View>
        </View>
        <View style={styles.sign}>
          <View style={styles.signColumn}>
            <Text>Hormat saya,</Text>
            {/* <Image  /> */}
            <Text style={styles.signImage}>Sign placeholder</Text>
            <Text>Yusuf Donny Satriyo</Text>
            <Text>NIP. 1213123</Text>
          </View>
        </View>
        {/* ======================== */}

        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableColHeaderNormal}>
              <Text style={styles.tableCellCenter}>
                CATATAN PEJABAT KEPEGAWAIAN
              </Text>
            </View>
            <View style={styles.tableColHeaderSpan}>
              <Text style={styles.tableCellCenter}>
                CATATAN/PERTIMBANGAN ATASAN LANGSUNG
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <Text style={styles.tableCellAlignLeft}>
                Cuti yang telah diambil
              </Text>
            </View>
            <View style={styles.tableColDivided}>
              <Text style={styles.tableCell}>Kasubag: Tata Usaha</Text>
            </View>
            <View style={styles.tableColDivided}>
              <Text style={styles.tableCell}>Kasubag: Tata Usaha</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <Text style={styles.tableCellAlignLeft}>
                dalam tahun yang bersangkutan
              </Text>
            </View>
            <View style={styles.tableColDividedSpanAllWithoutBorderBottom}>
              <Text style={styles.tableCellBig}>TTD</Text>
            </View>
            <View style={styles.tableColDividedSpanAllWithoutBorderBottom}>
              <Text style={styles.tableCellBig}>TTD</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <View style={styles.tableCellFlex}>
                <Text>1. Cuti Tahunan </Text>
                <Text>0 hari</Text>
              </View>
            </View>
            <View style={styles.tableColDividedSpanAllWithoutBorderBottom}>
              {/* <Text style={styles.tableCell}>TTD</Text> */}
            </View>
            <View style={styles.tableColDividedSpanAllWithoutBorderBottom}>
              {/* <Text style={styles.tableCell}>TTD</Text> */}
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <View style={styles.tableCellFlex}>
                <Text>2. Cuti Besar </Text>
                <Text>0 hari</Text>
              </View>
            </View>
            <View style={styles.tableColDividedSpanAllWithoutBorderBottom}>
              {/* <Text style={styles.tableCell}>TTD</Text> */}
            </View>
            <View style={styles.tableColDividedSpanAllWithoutBorderBottom}>
              {/* <Text style={styles.tableCell}>TTD</Text> */}
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <View style={styles.tableCellFlex}>
                <Text>3. Cuti Sakit </Text>
                <Text>0 hari</Text>
              </View>
            </View>
            <View style={styles.tableColDividedSpanAllWithBorderBottom}>
              {/* <Text style={styles.tableCell}>TTD</Text> */}
            </View>
            <View style={styles.tableColDividedSpanAllWithBorderBottom}>
              {/* <Text style={styles.tableCell}>TTD</Text> */}
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <View style={styles.tableCellFlex}>
                <Text>4. Cuti Bersalin </Text>
                <Text>0 hari</Text>
              </View>
            </View>
            <View style={styles.tableColDivided}>
              <Text style={styles.tableCell}>Nama</Text>
            </View>
            <View style={styles.tableColDivided}>
              <Text style={styles.tableCell}>Nama</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <View style={styles.tableCellFlex}>
                <Text>5. Cuti Alasan Penting </Text>
                <Text>0 hari</Text>
              </View>
            </View>
            <View style={styles.tableColDivided}>
              <Text style={styles.tableCell}>NIP</Text>
            </View>
            <View style={styles.tableColDivided}>
              <Text style={styles.tableCell}>NIP</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <Text>&nbsp;</Text>
            </View>
            <View style={styles.tableColDivided}>
              <Text style={styles.tableCell}>&nbsp;</Text>
            </View>
            <View style={styles.tableColDivided}>
              <Text style={styles.tableCell}>&nbsp;</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <Text></Text>
            </View>
            <View style={styles.tableColHeaderSpan}>
              <Text style={styles.tableCellCenter}>
                PEJABAT YANG BERWENANG MENYETUJUI CUTI
              </Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <Text style={styles.tableCellAlignLeft}>
                Sisa Cuti Tahunan: 12 hari
              </Text>
            </View>
            <View style={styles.tableColSpanAll}>
              <Text style={styles.tableCellCenter}>TTD</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <Text>&nbsp;</Text>
            </View>
            <View style={styles.tableColSpanAll}>
              <Text style={styles.tableCellCenter}></Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <Text>&nbsp;</Text>
            </View>
            <View style={styles.tableColSpanAllWithBorderBottom}>
              <Text style={styles.tableCellCenter}></Text>
            </View>
          </View>
          {/*  */}

          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <Text>&nbsp;</Text>
            </View>
            <View style={styles.tableColHeaderSpan}>
              <Text style={styles.tableCellCenter}>Nama</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColNormal}>
              <Text>&nbsp;</Text>
            </View>
            <View style={styles.tableColHeaderSpan}>
              <Text style={styles.tableCellCenter}>NIP</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default SuratPermintaanCuti;
