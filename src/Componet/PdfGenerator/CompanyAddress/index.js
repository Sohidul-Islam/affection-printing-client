import { StyleSheet, Text, View } from "@react-pdf/renderer";

const pageAddressStyle = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    line: {
      width: 8,
      height: 70,
      borderRadius: 2,
      backgroundColor: "rgba(0,0,0,0.2)",
    },
    text: {
      fontSize: 12,
      lineHeight: 1.2,
    },
  });

  export const PageAddress = () => {
    return (
      <View style={pageAddressStyle.container}>
        <View style={pageAddressStyle.line}></View>
        <View style={{ marginLeft: 8 }}>
          <Text style={pageAddressStyle.text}>Wahed Complex</Text>
          <Text style={pageAddressStyle.text}>
            263, Fakriapool (Ground Floor)
          </Text>
          <Text style={pageAddressStyle.text}>
            MotiJheel, Dhaka- 1000, Bangladesh.
          </Text>
          <Text style={pageAddressStyle.text}>
            Cell: 01819-070562, 01919-070562.
          </Text>
          <Text style={pageAddressStyle.text}>
            Email: affection.printing@gmail.com
          </Text>
        </View>
      </View>
    );
  };