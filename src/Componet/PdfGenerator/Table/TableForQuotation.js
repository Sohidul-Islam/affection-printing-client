import { Text, View } from "@react-pdf/renderer";
import { styles } from ".";
import currencyService from "../../Common/Shared/CurrencyFormat";

// Table for quotation
const RowForQuotation = ({ quotation, index }) => {
  console.log("challan", quotation);
  return (
    <View style={styles.tableRow}>
      <View style={{ ...styles.tableColsmRow }}>
        <Text style={styles.tableCell}>{index + 1}</Text>
      </View>
      <View style={{ ...styles.tableCollgRow, width: "42%" }}>
        <View style={styles.tableCell}>
          {/* Quotation topics list here */}
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: "12px",
                marginBottom: "4px",
              }}
            >
              {quotation?.title}
            </Text>
            {quotation?.topics?.map((topics, i) => (
              <View key={i} style={{ flexDirection: "row", gap: "4px" }}>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: "11px",
                  }}
                >
                  {topics?.title} :
                </Text>
                <Text style={{ flex: 1, fontWeight: "400", fontSize: "10px" }}>
                  {topics?.desc}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <View style={{ ...styles.tableColRow, width: "15%" }}>
        <View style={styles.tableCell}>
          {/* Quotation quontity list here */}
          <View style={{ flexDirection: "column", gap: 4 }}>
            {quotation?.priceList?.map((price, i) => (
              <Text
                key={i}
                style={{
                  fontWeight: "700",
                  fontSize: "11px",
                }}
              >
                {price?.quantity}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <View style={{ ...styles.tableColRow, width: "15%" }}>
        <View style={styles.tableCell}>
          {/* Quotation quontity list here */}
          <View style={{ flexDirection: "column", gap: 4 }}>
            {quotation?.priceList?.map((price, i) => (
              <Text
                key={i}
                style={{
                  fontWeight: "700",
                  fontSize: "11px",
                }}
              >
                {currencyService.formatCurrency(price?.unitPrice)}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <View style={{ ...styles.tableColRow, width: "20%" }}>
        <View style={styles.tableCell}>
          {/* Quotation quontity list here */}
          <View style={{ flexDirection: "column", gap: 4 }}>
            {quotation?.priceList?.map((price, i) => (
              <Text
                key={i}
                style={{
                  fontWeight: "700",
                  fontSize: "11px",
                }}
              >
                {currencyService.formatCurrency(price?.totalPrice)}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export const TableForQuotation = ({ data }) => {
  return (
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
          <Text style={styles.tableCell}>Unit price</Text>
        </View>
        <View style={{ ...styles.tableCol, width: "20%" }}>
          <Text style={styles.tableCell}>Total</Text>
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

      {data?.quotations?.map((quotation, index) => {
        return (
          <RowForQuotation quotation={quotation} index={index} key={index} />
        );
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
