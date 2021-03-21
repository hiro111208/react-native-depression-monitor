import React, { Component, useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";

function UserTable(props) {
  const { tableHead, setTableHead } = useState([]);
  const { tableData, setTableData } = useState([]);
  var data = [["1"], ["2"], ["3"], ["4"]];
  const dataHead = [["Session", "Avg Time Q1", "Avg Time Q2", " NºErrors"]];
  const avg1 = props.average1;
  const avg2 = props.average2;

  for (let i = 0; i < 4; i++) {
    data.concat(avg1[i]);
    data.concat(avg2[i]);
  }

  function setData() {
    setTableData(data);
    setTableData(dataHead);
  }

  useEffect(() => {
    setData;
  }, []);

  const alertIndex = (index) => {
    Alert.alert(`This is row ${index + 1}`);
  };

  const element = (data, index) => (
    <TouchableOpacity onPress={() => alertIndex(index)}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>button</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.tableContainer}>
      <Table borderStyle={{ borderWidth: 0.2, borderColor: "#000" }}>
        <Row
          data={dataHead}
          style={styles.tablehead}
          textStyle={styles.tabletext}
        />
        {data.map((rowData, index) => (
          <TableWrapper key={index} style={styles.row}>
            {rowData.map((cellData, cellIndex) => (
              <Cell
                key={cellIndex}
                data={cellIndex === 3 ? element(cellData, index) : cellData}
                textStyle={styles.text2}
              />
            ))}
          </TableWrapper>
        ))}
      </Table>
    </View>
  );
}
export default UserTable;

const styles = StyleSheet.create({
  tableContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  tablehead: { height: 40, backgroundColor: "#808B97" },
  tabletext: { margin: 6 },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
  btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
  btnText: { textAlign: "center", color: "#fff" },
});
