import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import InputSearch from "../InputSearch/InputSearch";

import { FontAwesome } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const Header = ({ goBack, title, screen, filter }) => {
  const [toggleModal, setToggleModal] = useState(false);

  const showInput = () => {
    setToggleModal(!toggleModal);
  };

  const previos = () => {
    if (
      screen === "Categories" ||
      screen === "Currency" ||
      screen === "ChoseCategory" ||
      screen === "ChoseExpenses" ||
      screen === "Send"
    ) {
      goBack();
    } else {
      return;
    }
  };
  return (
    <View
      style={{
        ...styles.header,
        backgroundColor: toggleModal ? "#696969" : "#333333",
      }}
    >
      <View style={{ flex: 1 }}>
        <InputSearch
          toggleModal={toggleModal}
          setToggleModal={showInput}
          filter={filter}
        />
      </View>

      {screen !== "DefaultScreenMore" ? (
        <View
          style={styles.headerMenu}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => previos()}
            style={{}}
          >
            <AntDesign
              style={{
                color:
                  screen === "Categories" ||
                  screen === "Currency" ||
                  screen === "ChoseExpenses" ||
                  screen === "ChoseCategory" ||
                  screen === "Send"
                    ? "#d3d3d3"
                    : "transparent",
              }}
              name="arrowleft"
              size={24}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => showInput()}>
            {screen !== "Send" && (
              <FontAwesome name="search" size={20} color="#d3d3d3" />
            )}
          </TouchableOpacity>
        </View>
      ) : (
        <View alignItems={"center"}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 70,
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    backgroundColor: "#333333",
  },
  headerMenu: {
    flexDirection: "row",
  },
  headerTitle: {
    fontFamily: "RubikRegular",
    fontWeight: "400",
    fontSize: 22,
    color: "#d3d3d3",
  },
});

export default Header;
