import * as React from "react";
import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const FormulirPermintaanCuti = () => {
  const styles = StyleSheet.create({
    imageHeader: {
      width: 556,
    },
    page: {
      padding: 20,
      fontSize: 10,
      lineHeight: 1.2,
    },
    textOpeningLeft: {
      flexDirection: "column",
      alignItems: "flex-end",
      marginBottom: 20,
    },
    textSecondLeft: {
      flexDirection: "column",
      alignItems: "flex-end",
      fontSize: 9,
    },
    textSecondLeftCenter: {
      flexDirection: "column",
      alignItems: "center",
      marginRight: 50,
    },
    // ===========
  });

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.textOpeningLeft}>
          <View>
            <Text>ANAK LAMPIRAN 1B</Text>
            <Text>PERATURAN BADAN KEPEGAWAIAN NEGARA</Text>
            <Text>REPUBLIK INDONESIA</Text>
            <Text>NOMOR 24 TAHUN 2018</Text>
            <Text>TENTANG</Text>
            <Text>TATA CARA PEMBERIAN CUTI PEGAWAI NEGERI SIPIL</Text>
          </View>
        </View>
        <View style={styles.textSecondLeft}>
          <View style={styles.textSecondLeftCenter}>
            <Text>Banjarbaru, 13 Juni 2023</Text>
            <Text>Kepada</Text>
            <Text>Yth. Kepala Balai Veteriner Banjarbaru</Text>
            <Text>di Tempat</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default FormulirPermintaanCuti;
