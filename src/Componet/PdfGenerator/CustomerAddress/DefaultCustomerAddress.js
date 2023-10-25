import { Text, View } from "@react-pdf/renderer";
import React from "react";
import { CustomerStyle } from ".";

function DefaultCustomerAddress({ data, type }) {
  const { user, date, serialNo } = data;
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View style={CustomerStyle.docsTypeContainer}>
        <View style={CustomerStyle.docsType}>
          <Text style={CustomerStyle.docsTypeText}>{type}</Text>
        </View>
      </View>
      {/* serial no and date */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={CustomerStyle.inputBox}>
          <View
            style={{ fontWeight: "bold", backgroundColor: "black", padding: 4 }}
          >
            <Text style={{ color: "white", fontSize: "12px" }}>No</Text>
          </View>
          <View style={{ minWidth: 30, paddingHorizontal: 4 }}>
            <Text style={{ fontSize: "12px" }}>{serialNo}</Text>
          </View>
        </View>
        <View style={CustomerStyle.inputBox}>
          <View
            style={{ fontWeight: "bold", backgroundColor: "black", padding: 4 }}
          >
            <Text style={{ color: "white", fontSize: "12px" }}>Date</Text>
          </View>
          <View style={{ minWidth: 30, paddingHorizontal: 4 }}>
            <Text style={{ fontSize: "12px" }}>{date}</Text>
          </View>
        </View>
      </View>
      {/* name and address */}
      <View style={{ flexDirection: "column", gap: 4, marginVertical: 10 }}>
        <View style={{ ...CustomerStyle.inputBox, borderLeft: 0 }}>
          <View
            style={{
              minWidth: "60px",
              fontWeight: "bold",
              backgroundColor: "rgba(188,149,196,1)",
              padding: 4,
            }}
          >
            <Text style={{ color: "white", fontSize: "12px" }}>Name</Text>
          </View>
          <View style={{ minWidth: 30, paddingHorizontal: 4 }}>
            <Text style={{ fontSize: "12px" }}>{user?.name}</Text>
          </View>
        </View>
        <View style={{ ...CustomerStyle.inputBox, borderLeft: 0 }}>
          <View
            style={{
              minWidth: "60px",
              fontWeight: "bold",
              backgroundColor: "rgba(188,149,196,1)",
              padding: 4,
            }}
          >
            <Text style={{ color: "white", fontSize: "12px" }}>Adress</Text>
          </View>
          <View style={{ minWidth: 30, paddingHorizontal: 4 }}>
            <Text style={{ fontSize: "12px" }}>{user?.address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default DefaultCustomerAddress;
