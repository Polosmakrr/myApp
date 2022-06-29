import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/action";
import Report from "./Report/Report";
import { generateUUID } from "../../../unicId";

import { AntDesign } from "@expo/vector-icons";

const CreateReport = ({ navigation: { navigate, goBack }, route }) => {
  const [chosedExpenses, setChosedExpenses] = useState([]);
  const [date, setDate] = useState(new Date());
  const [reportName, setReportName] = useState("Report#001");
  const [idReport, setIdReport] = useState("");
  const [total, setTotal] = useState(Number);

  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      if (route.params.report) {
        setIdReport(route.params.id);
        setChosedExpenses(route.params.report.item);
        setReportName(route.params.report.title);
        setTotal(route.params.report.total);
        setDate(new Date(route.params.report.date));
      }
      if (route.params.item) {
        setChosedExpenses(chosedExpenses.concat(route.params.item));

        return;
      }
    }
  }, [route.params]);

  useEffect(() => {
    const value = chosedExpenses.reduce((prev, item) => {
      return prev + Number(item.total);
    }, 0);
    setTotal(value);
  }, [chosedExpenses]);

  const onSave = () => {
    const report = {
      date: date.toDateString(),
      title: reportName,
      total: total,
      item: chosedExpenses,
      id: generateUUID(10),
    };
    if (idReport !== "") {
      dispatch(actions.editReport({ id: idReport, report }));
      setIdReport("");
      goBack();
      return;
    }
    dispatch(actions.addReport(report));
    goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={styles.headerMenu}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <TouchableOpacity activeOpacity={0.8} onPress={() => goBack()}>
            <AntDesign name="close" size={24} color="#d3d3d3" />
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                ...styles.buttonSave,
                backgroundColor: "#d3d3d3",
                marginRight: 10,
              }}
              activeOpacity={0.8}
              onPress={() => onSave()}
            >
              <Text style={styles.buttonSaveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.buttonSave,
                backgroundColor: "#3cb371",
              }}
              activeOpacity={0.8}
              onPress={() => navigate("Send")}
            >
              <Text style={styles.buttonSaveText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Report
        navigate={navigate}
        chosedExpenses={chosedExpenses}
        date={date}
        setDate={setDate}
        reportName={reportName}
        setReportName={setReportName}
        total={total}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  header: {
    height: 70,
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    backgroundColor: "#333333",
  },
  headerMenu: {
    flexDirection: "row",
  },
  buttonSave: { borderRadius: 5, padding: 5 },
  buttonSaveText: {
    fontFamily: "RubikRegular",
    fontWeight: "400",
    fontSize: 16,
    color: "#fff",
  },
});

export default CreateReport;
