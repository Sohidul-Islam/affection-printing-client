import React from "react";

import {
  Document,
  PDFViewer,
  Page,
  StyleSheet,
  View,
  Font,
  Image,
} from "@react-pdf/renderer";

import waterMark from "../../assets/Image/logo png sm.png";

import { PageHeader } from "./Header";
import { CustomerInfo } from "./CustomerAddress";
import { PageFooter } from "./Footer";
import { Table } from "./Table";
import { getPdfData } from "./helpers";

import PoppinsReguler from "../../assets/Fonts/Poppins-Regular.ttf";
import PoppinsBold from "../../assets/Fonts/Poppins-Bold.ttf";
import BanglaFont from "../../assets/Fonts/Bangla/SutonnyOMJunicode.ttf";
import BanglaFontBold from "../../assets/Fonts/Bangla/SutonnyMJ-Bold.ttf";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    fontFamily: "Poppins",
    fontWeight: "normal",
    paddingBottom: "100px",
  },
  pageContainer: {
    paddingHorizontal: 20,
    minHeight: 450,
  },
  pageHeaderContainer: {
    backgroundColor: "rgba(188,149,196,0.4)",
    height: 130,
    // marginBottom: 40,
  },
  pageFooterContainer: {
    position: "relative",
    bottom: 0,
    left: 0,
    // height: "100%",
    flex: 1,
  },
});

export const MyDocument = ({ data, type }) => {
  const generatedData = getPdfData(data, type);
  console.log({ generatedData });

  Font.register({
    family: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fonts: [
      {
        src: PoppinsReguler,
      },
      {
        src: PoppinsBold,
        fontWeight: "bold",
      },
      {
        src: BanglaFont,
        fontWeight: "bangla",
      },
    ],
  });

  Font.register({
    family: "SutonnyMJ",
    fontStyle: "normal",
    fontWeight: "400",
    fonts: [
      {
        src: BanglaFont,
        fontWeight: "400",
      },
      {
        src: BanglaFont,
        fontWeight: "700",
      },
    ],
  });

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.pageHeaderContainer} fixed>
          <PageHeader />
        </View>
        <View fixed>
          <CustomerInfo data={generatedData} type={type} />
        </View>
        <View style={styles.pageContainer}>
          {/* Table */}
          <Table data={generatedData} type={type} />
        </View>

        <View fixed style={{ marginTop: 40 }}>
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "250px",
              bottom: 0,
              zIndex: -1,
              opacity: 0.2,
            }}
          >
            <Image
              style={{
                position: "absolute",
                right: 20,
                bottom: 0,
                height: "100%",
              }}
              source={waterMark}
            />
          </View>
          <View style={styles.pageFooterContainer}>
            <PageFooter type={type} />
          </View>
        </View>
      </Page>
    </Document>
  );
};

function PdfGenerator({ data, type }) {
  return (
    <PDFViewer
      style={{
        width: "100%",
        height: "100%",
        "&::-webkit-scrollbar": {
          display: "none",
        },
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <MyDocument data={data} type={type} />
    </PDFViewer>
  );
}

export default PdfGenerator;
