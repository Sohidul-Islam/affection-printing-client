import { StyleSheet, Text, View } from "@react-pdf/renderer";
import { getAmountInWord } from "./../../Page/AddBill/helpers";
import moment from "moment";
import { viewDuesOrNot } from "../helpers";

const styles = StyleSheet.create({
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

// Table for challan
const RowForChallan = ({ challan, index }) => {
  console.log("challan", challan);
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableColsmRow}>
        <Text style={styles.tableCell}>{index + 1}</Text>
      </View>
      <View style={styles.tableCollgRow}>
        <Text style={styles.tableCell}>{challan?.desc} </Text>
      </View>
      <View style={styles.tableColRow}>
        <Text style={styles.tableCell}>{challan?.quantity}</Text>
      </View>
      <View style={styles.tableColRow}>
        <Text style={styles.tableCell}>{challan?.remark}</Text>
      </View>
    </View>
  );
};

const TableForChallan = ({ data }) => {
  return (
    <View style={styles.table}>
      {/* column */}
      <View style={styles.tableRow}>
        <View style={styles.tableColsm}>
          <Text style={styles.tableCell}>SL NO</Text>
        </View>
        <View style={styles.tableCollg}>
          <Text style={styles.tableCell}>Description</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Quantity</Text>
        </View>
        <View style={styles.tableCol}>
          <Text style={styles.tableCell}>Remark</Text>
        </View>
      </View>
      {/* row */}
      <View
        style={{
          borderStyle: "solid",
          borderTop: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
        }}
        fixed
      ></View>

      {data?.challans.map((challan, index) => {
        return <RowForChallan challan={challan} index={index} key={index} />;
      })}

      <View
        style={{
          borderStyle: "solid",
          borderBottom: 1,
          borderLeftWidth: 0,
          borderRightWidth: 0,
        }}
        fixed
      ></View>
    </View>
  );
};

// Table for challan
const RowForBill = ({ bill, index }) => {
  console.log("challan", bill);
  return (
    <View style={styles.tableRow}>
      <View style={styles.tableColsmRow}>
        <Text style={styles.tableCell}>{index + 1}</Text>
      </View>
      <View style={{ ...styles.tableCollgRow, width: "42%" }}>
        <Text style={styles.tableCell}>{bill?.desc} </Text>
      </View>
      <View style={{ ...styles.tableColRow, width: "15%" }}>
        <Text style={styles.tableCell}>{bill?.quantity}</Text>
      </View>
      <View style={{ ...styles.tableColRow, width: "15%" }}>
        <Text style={styles.tableCell}>{bill?.price}</Text>
      </View>
      <View style={{ ...styles.tableColRow, width: "20%" }}>
        <Text style={styles.tableCell}>{bill?.amount}</Text>
      </View>
    </View>
  );
};

const RowForDueAmount = ({ due }) => {
  return (
    <View style={styles.tableRow}>
      <View style={{ ...styles.tableCollgRow, width: "10%" }}>
        <Text style={styles.tableCell}>{due?.billNo}</Text>
      </View>
      <View style={{ ...styles.tableColRow, width: "70%" }}>
        <Text style={styles.tableCell}>
          {moment(due?.date).format("DD MMMM, YYYY")}
        </Text>
      </View>
      <View style={{ ...styles.tableColRow, width: "20%" }}>
        <Text style={styles.tableCell}>{due?.due}</Text>
      </View>
    </View>
  );
};

const TableForBill = ({ data }) => {
  return (
    <>
      <View style={styles.table}>
        {/* column */}
        <View style={styles.tableRow}>
          <View style={styles.tableColsm}>
            <Text style={styles.tableCell}>SL NO</Text>
          </View>
          <View style={{ ...styles.tableCollg, width: "42%" }}>
            <Text style={styles.tableCell}>Description</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "15%" }}>
            <Text style={styles.tableCell}>Quantity</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "15%" }}>
            <Text style={styles.tableCell}>Unit Price</Text>
          </View>
          <View style={{ ...styles.tableCol, width: "20%" }}>
            <Text style={styles.tableCell}>Amount</Text>
          </View>
        </View>
        {/* row */}
        <View
          style={{
            borderStyle: "solid",
            borderTop: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
          }}
          fixed
        ></View>

        {data?.bills.map((bill, index) => {
          return <RowForBill bill={bill} index={index} key={index} />;
        })}

        {/* total balance */}
        <View style={{ ...styles?.tableRow, borderTop: 1 }}>
          <View style={{ ...styles?.tableColsm, width: "65%" }}>
            <Text style={styles?.tableCell}>
              Taka (In Words): {getAmountInWord(data?.totalAmount)}
            </Text>
          </View>
          {/* bellow row for total amount and advance and payment informations*/}
          <View style={{ width: "35%", borderRight: 1 }}>
            <View style={{ flexDirection: "column", width: "100%" }}>
              {/* Total */}
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View
                  style={{ width: "43.1%", borderRight: 1, borderBottom: 1 }}
                >
                  <Text style={{ ...styles?.tableCell, paddingHorizontal: 4 }}>
                    Total
                  </Text>
                </View>
                <View style={{ width: "56.9%", borderBottom: 1 }}>
                  <Text style={{ ...styles?.tableCell, paddingHorizontal: 4 }}>
                    {data?.totalAmount}
                  </Text>
                </View>
              </View>
              {/* Advance */}
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View
                  style={{ width: "43.1%", borderRight: 1, borderBottom: 1 }}
                >
                  <Text style={{ ...styles?.tableCell, paddingHorizontal: 4 }}>
                    Advance
                  </Text>
                </View>
                <View style={{ width: "56.9%", borderBottom: 1 }}>
                  <Text style={{ ...styles?.tableCell, paddingHorizontal: 4 }}>
                    {data?.advance}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View
                  style={{ width: "43.1%", borderRight: 1, borderBottom: 1 }}
                >
                  <Text style={{ ...styles?.tableCell, paddingHorizontal: 4 }}>
                    Payment
                  </Text>
                </View>
                <View style={{ width: "56.9%", borderBottom: 1 }}>
                  <Text style={{ ...styles?.tableCell, paddingHorizontal: 4 }}>
                    {data?.payment}
                  </Text>
                </View>
              </View>
              {/* Due */}
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "43.1%", borderRight: 1 }}>
                  <Text style={{ ...styles?.tableCell, paddingHorizontal: 4 }}>
                    Due
                  </Text>
                </View>
                <View style={{ width: "56.9%" }}>
                  <Text style={{ ...styles?.tableCell, paddingHorizontal: 4 }}>
                    {data?.due}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View
          style={{
            borderStyle: "solid",
            borderBottom: 1,
            borderLeftWidth: 0,
            borderRightWidth: 0,
          }}
          fixed
        ></View>
      </View>

      {/* For dues amount list */}

      {viewDuesOrNot(data) && (
        <View style={{ marginTop: "10px" }}>
          <Text
            style={{
              textAlign: "center",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            PREVIOUS DUES
          </Text>
          <View style={{ ...styles.table, borderRight: 0, marginTop: 10 }}>
            {/* column */}
            <View style={{ ...styles.tableRow, borderBottom: 1 }}>
              <View
                style={{
                  ...styles.tableColsm,
                  width: "10%",
                  padding: 4,
                  margin: 0,
                }}
              >
                <Text style={styles.tableCell}>Bill NO</Text>
              </View>
              <View
                style={{
                  ...styles.tableCollg,
                  width: "70%",
                  padding: 4,
                  margin: 0,
                }}
              >
                <Text style={styles.tableCell}>Date</Text>
              </View>
              <View
                style={{
                  ...styles.tableCol,
                  width: "20%",
                  padding: 4,
                  margin: 0,
                }}
              >
                <Text style={styles.tableCell}>Due</Text>
              </View>
            </View>

            {data?.dues?.map((due, index) => {
              return <RowForDueAmount due={due} key={index} />;
            })}
            {/* total dues */}

            <View style={{ ...styles.tableRow, borderTop: 1 }}>
              <View style={{ ...styles.tableCollgRow, width: "10%" }}>
                <Text style={styles.tableCell}>Total</Text>
              </View>
              <View style={{ ...styles.tableColRow, width: "70%" }}>
                <Text style={styles.tableCell}>
                  <Text style={styles.tableCell}>
                    {" "}
                    Taka (In Words):{" "}
                    {getAmountInWord(
                      data?.dues?.reduce((prev, item) => prev + item?.due, 0) +
                        data?.due
                    )}
                  </Text>
                </Text>
              </View>
              <View style={{ ...styles.tableColRow, width: "20%" }}>
                <Text style={styles.tableCell}>
                  {data?.dues?.reduce((prev, item) => prev + item?.due, 0) +
                    data?.due}
                </Text>
              </View>
            </View>

            {/* row */}
            <View
              style={{
                borderStyle: "solid",
                borderTop: 1,
                borderLeftWidth: 0,
                borderRightWidth: 0,
              }}
              fixed
            ></View>
          </View>
        </View>
      )}
    </>
  );
};

export const Table = ({ data, type }) => {
  return (
    <View>
      {type === "challan" && <TableForChallan data={data} />}
      {type === "bill" && <TableForBill data={data} />}
      {type === "order" && <TableForChallan data={data} />}
    </View>
  );
};
