import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Table, Rows, Row } from "react-native-table-component";
import * as indexStyles from "../config/indexStyles";

/**
 * Returns data displayed in a table format
 */
function UserTable(props) {
  // Headers of the table
  const dataHead = ["Batch", "AvgTimeQ1", "AvgTimeQ2", "NºErrors"];

  //variables to store averages in one decimal format
  const setData = () => {
    const data = [["º 1"], ["º 2"], ["º 3"], ["º 4"]];
    const average1 = props.average1;
    const average2 = props.average2;
    const roundedData1 = [];
    const roundedData2 = [];

    //format averages and push to table data
    for (let i = 0; i < 4; i++) {
      // Rounds average to one decimal place
      if (average1[i] !== 0) {
        data[i].push(`${(average1[i] / 1000).toFixed(2)}(s)`);
      } else {
        data[i].push(0);
      }

      // Rounds average to one decimal place
      if (average2[i] !== 0) {
        data[i].push(`${(average2[i] / 1000).toFixed(2)}(s)`);
      } else {
        data[i].push(0);
      }
      data[i].push(props.errorNum[i]);
    }
    return data;
  };

  //upon Mount get UserList
  useEffect(() => {
    const ac = new AbortController();
    const sig = ac.signal;
    Promise.all([setData(), { signal: sig }]).catch((ex) => console.error(ex));

    // Abort both fetches on unmount
    return function cleanup() {
      ac.abort();
    };
  }, []);

  return (
    <View>
      <View style={styles.container}>
        <Table
          borderStyle={{
            borderWidth: 0.3,
            borderColor: "black",
          }}
        >
          <Row
            data={dataHead}
            style={[styles.headStyle, indexStyles.centering]}
            textStyle={styles.tableText}
          />
          <Rows data={setData()} textStyle={styles.tableText} />
        </Table>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 0.4,
    backgroundColor: "transparent",
    borderRadius: 15,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    textAlign: "center",
    padding: 10,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  headStyle: {
    height: 30,
    backgroundColor: "#f4cbcb",
  },
  tableText: {
    fontSize: 9,
    fontWeight: "300",
    margin: 5,
    padding: 5,
  },
});

export default UserTable;
