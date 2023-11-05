import { Image, StyleSheet, Text, View } from "@react-pdf/renderer";
import signature from "../../../assets/Image/milonsignature.png";

const pageFooterStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    // position: "relative",
    position: "absolute",
    flexDirection: "column",
    bottom: -80,
    width: "100%",
    height: 100,
    // backgroundColor: "red",
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
  },
  text: {
    fontSize: 12,
    lineHeight: 1.2,
  },
});

export const FooterForGlobal = () => {
  return (
    <View style={pageFooterStyle.container}>
      <View style={pageFooterStyle.content}>
        <View>
          <Text style={pageFooterStyle.text}>Receiver Signature</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image src={signature} style={{ width: 100, objectFit: "covered" }} />
          <Text style={pageFooterStyle.text}>Authorized Signature</Text>
        </View>
      </View>
    </View>
  );
};

export const FooterForQuotation = () => {
  return (
    <View style={pageFooterStyle.container}>
      <View style={pageFooterStyle.content}>
        <View>
          <Text style={pageFooterStyle.text}>Thanking You</Text>
          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Image
              src={signature}
              style={{ width: 100, objectFit: "covered" }}
            />
            <Text style={pageFooterStyle.text}>
              Affection Printing & Packaging
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const PageFooter = ({ type }) => {
  return (
    <View>
      {type !== "quotation" ? <FooterForGlobal /> : <FooterForQuotation />}
    </View>
  );
};
