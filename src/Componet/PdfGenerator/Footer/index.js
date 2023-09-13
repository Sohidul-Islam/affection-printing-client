import { StyleSheet, Text, View } from "@react-pdf/renderer";

const pageFooterStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    // position: "relative",
    position: "absolute",
    flexDirection: "column",
    bottom: -100,
    width: "100%",
    height: 100,
    // backgroundColor: "red",
    overflow: "hidden",
  },
  content: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  text: {
    fontSize: 12,
    lineHeight: 1.2,
  },
});

export const PageFooter = () => {
  return (
    <View style={pageFooterStyle.container}>
      <View style={pageFooterStyle.content}>
        <View>
          <Text style={pageFooterStyle.text}>Receiver Signature</Text>
        </View>
        <View>
          <Text style={pageFooterStyle.text}>Authorized Signature</Text>
        </View>
      </View>
    </View>
  );
};
