import { Image, StyleSheet, View } from "@react-pdf/renderer";
import logo from "../../../assets/Image/logo png.png";
import { PageAddress } from "../CompanyAddress";

const pageHeaderStyle = StyleSheet.create({
  container: {
    position: "relative",
    top: 0,
    left: 0,
    height: "100%",
  },

  innerContainer: {
    paddingHorizontal: 20,
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: 10,
    marginBottom: 4,
  },

  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  lineBottom: {
    backgroundColor: "rgba(0,0,0,0.3)",
    height: "8px",
    width: "100%",
    position: "absolute",
    left: 0,
    bottom: 0,
  },
});
export const PageHeader = () => {
  return (
    <View style={pageHeaderStyle.container}>
      <View style={pageHeaderStyle.innerContainer}>
        <View style={pageHeaderStyle.content}>
          <Image
            style={{
              width: 200,
            }}
            src={logo}
          ></Image>
          <PageAddress />
        </View>
      </View>
      <View style={pageHeaderStyle.lineBottom}></View>
    </View>
  );
};
