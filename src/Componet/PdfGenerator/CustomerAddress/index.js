import { Font, Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import PoppinsReguler from "../../../assets/Fonts/Poppins-Regular.ttf";
import PoppinsBold from "../../../assets/Fonts/Poppins-Bold.ttf";
import DefaultCustomerAddress from "./DefaultCustomerAddress";
import QuotationCustomerAddress from "./QuotationCustomerAddress";

export const CustomerStyle = StyleSheet.create({
  container: {},
  docsTypeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },

  docsType: {
    backgroundColor: "rgba(188,149,196,1)",
    height: 30,
    minWidth: "120px",
    maxHeight: "200px",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,

    fontWeight: "bold",
  },
  docsTypeText: {
    // fontSize: 24,
    textTransform: "uppercase",
    color: "white",
    paddingVertical: 1,
    paddingHorizontal: 1,
    // fontWeight: "bold",
  },

  inputBoxLeft: {},
  inputBoxRight: {},
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    border: "1px solid black",
  },
});

export const CustomerInfo = ({ data, type = "Challan" }) => {
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
    ],
  });

  return type !== "quotation" ? (
    <DefaultCustomerAddress type={type} data={data} />
  ) : (
    <QuotationCustomerAddress type={type} data={data} />
  );
};
