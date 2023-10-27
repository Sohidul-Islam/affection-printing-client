import { StyleSheet, View } from "@react-pdf/renderer";

import { TableForBill } from "./TableForBill";
import { TableForChallan } from "./TableForChallan";
import { TableForQuotation } from "./TableForQuotation";

export const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    overflow: "hidden",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColsm: {
    width: "8%",
    padding: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCollg: {
    width: "62%",
    padding: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCol: {
    width: "15%",
    padding: 4,
    borderStyle: "solid",
    borderWidth: 1,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    fontFamily: "SutonnyMJ",
    // margin: "auto",
    marginVertical: 4,
    fontSize: "10px",
  },
  // for row
  tableColsmRow: {
    width: "8%",
    padding: 4,
    borderColor: "transparent",
    borderLeftWidth: 0,
    borderRightWidth: 1,

    borderTopWidth: 0,
  },
  tableCollgRow: {
    width: "62%",
    padding: 4,
    // borderStyle: "solid",
    borderColor: "transparent",
    // borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 1,

    borderTopWidth: 0,
  },
  tableColRow: {
    width: "15%",
    padding: 4,
    // borderStyle: "solid",
    borderColor: "transparent",
    // borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 1,

    borderTopWidth: 0,
  },
});

export const Table = ({ data, type }) => {
  return (
    <View>
      {type === "challan" && <TableForChallan data={data} />}
      {type === "bill" && <TableForBill data={data} />}
      {type === "quotation" && <TableForQuotation data={data} />}
    </View>
  );
};
