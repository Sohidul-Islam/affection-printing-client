import { Text, View } from "@react-pdf/renderer";
import { styles } from ".";

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

export const TableForChallan = ({ data }) => {
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
