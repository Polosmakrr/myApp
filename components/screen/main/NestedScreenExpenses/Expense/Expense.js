import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import LargeImg from "../LargeImg/LargeImg";

import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const Expense = ({
  nav,
  photo,
  expense,
  setExpense,
  choseCurrency,
  currentCategory,
}) => {
  const [datePicker, setDatePicker] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  useEffect(() => {
    if (photo) {
      if (photo.photo) {
        setExpense({ ...expense, ...{ img: photo.photo } });
      }
    }
  }, [photo]);

  const onDateSelected = (event, value) => {
    setExpense({ ...expense, ...{ date: value.toDateString() } });
    setDatePicker(!datePicker);
  };

  const vievLargeImg = () => {
    if (expense.img) {
      setToggleModal(!toggleModal);
      return;
    }
    nav.navigate("Camera");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputTitle}
        placeholderTextColor={"#d3d3d3"}
        placeholder="Merchant name"
        onChangeText={(value) =>
          setExpense({ ...expense, ...{ title: value } })
        }
        value={expense.title}
      />
      <View alignItems={"center"} style={{ paddingBottom: 30 }}>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 250,
            maxWidth: "80%",
          }}
          onPress={() => vievLargeImg()}
        >
          {expense.img ? (
            <Image
              style={{ width: 250, height: 250 }}
              source={{ uri: expense.img }}
            />
          ) : (
            <MaterialIcons
              name="add-photo-alternate"
              size={75}
              color="black"
              style={{ opacity: 0.5 }}
            />
          )}
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TouchableOpacity
          style={styles.itemBlock}
          onPress={() => setDatePicker(true)}
        >
          <Feather
            style={styles.icon}
            name="calendar"
            size={24}
            color="#d3d3d3"
          />

          <Text style={styles.textValue}>{expense.date}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemBlock}
          onPress={() => nav.navigate("ChoseCategory")}
        >
          <FontAwesome
            style={styles.icon}
            name="th-list"
            size={24}
            color="#d3d3d3"
          />
          {currentCategory.length === 0 ? (
            <Text style={styles.text}>Add category</Text>
          ) : (
            <Text style={styles.text}>{currentCategory}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.itemBlock, justifyContent: "space-between" }}
        >
          <View style={{ flexDirection: "row" }}>
            <AntDesign
              style={styles.icon}
              name="tago"
              size={24}
              color="#d3d3d3"
            />
            <Text style={styles.text}>Total</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              paddingRight: 30,
            }}
          >
            <TextInput
              style={{
                ...styles.textValue,
              }}
              placeholderTextColor={"#d3d3d3"}
              placeholder={"0, 00"}
              keyboardType="numeric"
              onChangeText={(value) =>
                setExpense({
                  ...expense,
                  ...{ total: value },
                })
              }
              value={expense.total}
            />
            <Text style={{ color: "#fff", fontSize: 20, paddingLeft: 5 }}>
              {choseCurrency.symbol_native}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemBlock}
          onPress={() => nav.navigate("ScreenMore", { screen: "Currency" })}
        >
          <Ionicons
            style={styles.icon}
            name="logo-usd"
            size={24}
            color="#d3d3d3"
          />
          {choseCurrency.length !== 0 ? (
            <Text style={styles.textValue}>{choseCurrency.code}</Text>
          ) : (
            <Text style={styles.textValue}>Chose currency</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBlock}>
          <MaterialIcons
            style={styles.icon}
            name="playlist-add"
            size={24}
            color="#d3d3d3"
          />
          <TextInput
            style={{ ...styles.textValue, width: "80%" }}
            placeholderTextColor={"#d3d3d3"}
            placeholder="Add description"
            onChangeText={(value) =>
              setExpense({ ...expense, ...{ description: value } })
            }
            value={expense.description}
          />
        </TouchableOpacity>
      </ScrollView>
      {datePicker && (
        <DateTimePicker
          value={new Date(expense.date)}
          mode={"date"}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          is24Hour={true}
          onChange={onDateSelected}
          style={styles.datePicker}
        />
      )}
      <View>
        {expense.img ? (
          <LargeImg
            toggleModal={toggleModal}
            setToggleModal={setToggleModal}
            img={expense.img}
          />
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputTitle: {
    paddingLeft: 30,
    width: "80%",
    fontFamily: "RubikRegular",
    fontWeight: "400",
    fontSize: 22,
    color: "#fff",
  },
  itemBlock: { flexDirection: "row", paddingHorizontal: 10, paddingBottom: 20 },
  icon: { paddingRight: 20 },
  textValue: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 18,
    color: "#fff",
  },
  text: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 18,
    color: "#d3d3d3",
  },
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
});

export default Expense;
