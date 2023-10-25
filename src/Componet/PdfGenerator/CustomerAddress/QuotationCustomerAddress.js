import { StyleSheet, Text, View } from "@react-pdf/renderer";
import React from "react";

export const QuotationCustomerStyle = StyleSheet.create({});

function QuotationCustomerAddress({ data }) {
  return (
    <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Text style={{ fontSize: 10 }}>To</Text>
          <Text style={{ fontSize: 10 }}>{data?.user?.name}</Text>
          <Text style={{ fontSize: 10 }}>{data?.user?.address}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 10 }}>{data?.date}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
          gap: 4,
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 10, fontWeight: 600 }}>Subject:</Text>
        <Text style={{ fontSize: 10, fontWeight: 400 }}>{data?.subject}</Text>
      </View>
      <View
        style={{
          flexDirection: "column",
          gap: 4,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontSize: 10, fontWeight: 400 }}>Dear Sir,</Text>
        <Text style={{ fontSize: 10, fontWeight: 400 }}>
          Reference to the discussion in your office, the price of printing has
          give below for your kind approval.
        </Text>
      </View>
    </View>
  );
}

export default QuotationCustomerAddress;
