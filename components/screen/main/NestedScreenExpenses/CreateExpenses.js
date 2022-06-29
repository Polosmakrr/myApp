import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/action";
import Alert from "./Alert/Alert";
import Expense from "./Expense/Expense";
import { AntDesign } from "@expo/vector-icons";
import { generateUUID } from "../../../unicId";

const initExpense = {
  title: "",
  img: "",
  date: new Date().toDateString(),
  category: "",
  total: "",
  currency: "",
  description: "",
  id: null,
};

const CreateExpenses = ({ navigation, route }) => {
  const { currentCategory, choseCurrency } = useSelector((state) => state.data);
  const [showAlert, setShowAlert] = useState(false);
  const [expense, setExpense] = useState(initExpense);
  const [idExpense, setIdExpense] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    setExpense({
      ...expense,
      ...{ category: currentCategory },
    });
  }, [currentCategory]);

  useEffect(() => {
    setExpense({
      ...expense,
      ...{ currency: choseCurrency },
    });
  }, [choseCurrency]);

  useEffect(() => {
    setExpense({ ...expense, ...{ id: generateUUID(10) } });
    if (route.params) {
      if (route.params.expense) {
        setIdExpense(route.params.id);
        setExpense(route.params.expense);
        dispatch(actions.choseCategory(route.params.expense.category));
        dispatch(actions.choseCurrency(route.params.expense.currency));
        return;
      }
      setExpense({ ...expense, ...{ img: route.params.photo } });
    }
  }, []);

  // useEffect(() => {
  //   setExpense({ ...expense, ...{ id: generateUUID(10) } });
  // }, []);

  const onClose = () => {
    setShowAlert(!showAlert);
    setExpense(initExpense);
    dispatch(actions.clearCurrent());
    setIdExpense(null);
    navigation.navigate("DefaultExpenses");
  };

  const onSave = () => {
    if (expense.title && expense.category && expense.total) {
      if (idExpense !== "") {
        dispatch(actions.editExpense({ id: idExpense, expense }));
        dispatch(actions.clearCurrent());
        setExpense(initExpense);
        setIdExpense("");
        navigation.navigate("DefaultExpenses");
        return;
      }
      dispatch(actions.addExpense(expense));
      dispatch(actions.clearCurrent());
      setExpense(initExpense);
      navigation.navigate("DefaultExpenses");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={styles.headerMenu}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowAlert(!showAlert)}
          >
            <AntDesign name="close" size={24} color="#d3d3d3" />
          </TouchableOpacity>

          {expense && (
            <TouchableOpacity
              style={{
                ...styles.buttonSave,
                backgroundColor:
                  expense.title && expense.category && expense.total
                    ? "#3cb371"
                    : "#d3d3d3",
              }}
              activeOpacity={0.8}
              onPress={() => onSave()}
            >
              <Text style={styles.buttonSaveText}>Save</Text>
            </TouchableOpacity>
          )}
          {showAlert && (
            <Alert
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              onClose={onClose}
            />
          )}
        </View>
      </View>
      <Expense
        nav={navigation}
        photo={route.params}
        expense={expense}
        setExpense={setExpense}
        choseCurrency={choseCurrency}
        currentCategory={currentCategory}
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

export default CreateExpenses;
