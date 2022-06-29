import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/action";
import Header from "../Header/Header";
import Button from "../Button/Button";
import ExpensesMenu from "./Menu/ExpensesMenu";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const DefaultExpenses = ({ navigation }) => {
  const { allExpenses } = useSelector((state) => state.data);
  const dispatch = useDispatch();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [removeId, setRemoveId] = useState("");
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    setFilteredExpenses(allExpenses);
  }, [allExpenses]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const showMenu = () => {
    setToggleModal(!toggleModal);
  };

  const scan = () => {
    setToggleModal(!toggleModal);
    navigation.navigate("Camera");
  };

  const create = () => {
    setToggleModal(!toggleModal);
    navigation.navigate("CreateExpenses");
  };

  const onRemove = () => {
    setRemoveId("");
    setToggleModal(!toggleModal);
    dispatch(actions.removeExpense(removeId));
  };

  const filter = (value) => {
    const filteredValue = allExpenses.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredExpenses(filteredValue);
  };

  return (
    <View style={styles.container}>
      <Header title={"Expenses"} filter={filter} />
      {allExpenses.length !== 0 ? (
        <View style={styles.expensesBlock}>
          {filteredExpenses.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.expensesBlockItem}
              onLongPress={() => {
                setRemoveId(item.id);
                setToggleModal(!toggleModal);
              }}
              onPress={() => {
                navigation.navigate("CreateExpenses", {
                  expense: item,
                  id: item.id,
                });
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={styles.expensesBlockImg}>
                  {item.img ? (
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: item.img }}
                    />
                  ) : (
                    <FontAwesome
                      name="file-picture-o"
                      size={50}
                      color="#d3d3d3"
                    />
                  )}
                </View>
                <View>
                  <Text style={styles.expensesBlockTitle}>{item.title}</Text>
                  <Text style={styles.expensesBlockText}>{item.category}</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.expensesBlockTotal}>
                  {Number(item.total).toFixed(2)}
                </Text>
                <Text style={styles.expensesBlockTotal}>
                  {item.currency.symbol_native}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={styles.emptyBlock}>
            <MaterialIcons
              name="credit-card"
              size={150}
              color={"#3cb270"}
              style={{ opacity: 0.2 }}
            />
            <Text style={styles.emptyBlockText}>
              Your expenses will show up here. Tap the button below to create
              the first one!
            </Text>
          </View>
        </View>
      )}
      {!isKeyboardVisible && (
        <Button
          title={"Create expanse"}
          setToggleModal={setToggleModal}
          toggleModal={toggleModal}
        />
      )}
      <ExpensesMenu
        toggleModal={toggleModal}
        setToggleModal={showMenu}
        create={create}
        scan={scan}
        removeId={removeId}
        setRemoveId={setRemoveId}
        onRemove={onRemove}
      />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  emptyBlock: {
    position: "absolute",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    top: "60%",
  },
  emptyBlockText: {
    paddingTop: 30,
    width: 320,
    textAlign: "center",
    color: "#d3d3d3",
    fontFamily: "RubikRegular",
    fontWeight: "400",
    fontSize: 14,
  },
  expensesBlock: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  expensesBlockItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  expensesBlockImg: { paddingRight: 20 },
  expensesBlockTitle: {
    fontFamily: "RobotoBold",
    fontWeight: "900",
    fontSize: 18,
    color: "#fff",
  },
  expensesBlockText: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 14,
    color: "#d3d3d3",
  },
  expensesBlockTotal: {
    fontFamily: "RobotoBold",
    fontWeight: "900",
    fontSize: 18,
    color: "#fff",
  },
});

export default DefaultExpenses;
