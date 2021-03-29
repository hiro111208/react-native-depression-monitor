import React, { useEffect, useRef, useState } from "react";

import { StyleSheet, View } from "react-native";

import { Table, Rows, Row } from "react-native-table-component";

function UserTable(props) {
  const dataHead = ["Batch", "AvgTimeQ1", "AvgTimeQ2", "NºErrors"];

  const setData = () => {
    //variables to store averages in one decimal format
    const data = [["º 1"], ["º 2"], ["º 3"], ["º 4"]];
    const average1 = props.average1;
    const average2 = props.average2;
    const roundedData1 = [];
    const roundedData2 = [];

    // store averages in string format
    for (let i = 0; i < 4; i++) {
      roundedData1.push(`${average1[i] / 1000}`.length);
      roundedData2.push(`${average2[i] / 1000}`.length);
    }

    //format averages and push to table data
    for (let i = 0; i < 4; i++) {
      // Rounds average to one decimal place
      if (average1[i] !== 0) {
        data[i].push(
          `${(average1[i] / Math.pow(10, roundedData1[i] - 1)).toFixed(1)}(s)`
        );
      } else {
        data[i].push(0);
      }

      // Rounds average to one decimal place
      if (average2[i] !== 0) {
        data[i].push(
          `${(average2[i] / Math.pow(10, roundedData2[i] - 1)).toFixed(1)}(s)`
        );
      } else {
        data[i].push(0);
      }

      data[i].push(props.errorNum[i]);
    }
    return data;
  };

  useEffect(() => {}, [setData()]);
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
            style={styles.HeadStyle}
            textStyle={styles.TableText}
          />
          <Rows data={setData()} textStyle={styles.TableText} />
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
    backgroundColor: "white",
    borderRadius: 10,
  },
  HeadStyle: {
    height: 30,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#f4cbcb",
  },
  TableText: {
    fontSize: 11,
    fontWeight: "300",
    margin: 5,
    padding: 5,
  },
});

export default UserTable;
