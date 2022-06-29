import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Appearance,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import ThemeMenu from "./Theme/ThemeMenu";

import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";

const DefaultScreenMore = ({ navigation }) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [themeValue, setThemeValue] = useState("Dark");
  const { choseCurrency } = useSelector((state) => state.data);

  const route = useRoute();

  useEffect(() => {
    let thema = Appearance.getColorScheme();
    setThemeValue(thema[0].toUpperCase() + thema.slice(1));
  }, []);

  const showMenu = () => {
    setToggleModal(!toggleModal);
  };
  return (
    <View style={styles.container}>
      <Header title={"More"} screen={route.name} />
      <Text
        style={{
          ...styles.text,
          paddingTop: 20,
          paddingBottom: 10,
          paddingLeft: 70,
          fontSize: 12,
        }}
      >
        SETTINGS
      </Text>
      <TouchableOpacity
        style={{ ...styles.block, paddingBottom: 30 }}
        activeOpacity={0.8}
        onPress={() => setToggleModal(!toggleModal)}
      >
        {themeValue === "Dark" && (
          <Feather
            style={{ ...styles.icon, top: 10 }}
            name="moon"
            size={24}
            color="#d3d3d3"
          />
        )}
        {themeValue === "Light" && (
          <Octicons
            style={{ ...styles.icon, top: 10 }}
            name="sun"
            size={24}
            color="#d3d3d3"
          />
        )}
        <View>
          <Text style={styles.title}>Theme</Text>
          <Text style={styles.text}>{themeValue}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Categories")}
      >
        <FontAwesome
          style={styles.icon}
          name="th-list"
          size={24}
          color="#d3d3d3"
        />
        <Text style={styles.title}>Categories</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.block, paddingBottom: 30 }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Currency")}
      >
        <Ionicons
          style={{ ...styles.icon, top: 10 }}
          name="logo-usd"
          size={24}
          color="#d3d3d3"
        />
        <View>
          <Text style={styles.title}>Currency</Text>
          {choseCurrency.length !== 0 ? (
            <Text style={styles.text}>{choseCurrency.code}</Text>
          ) : (
            <Text style={styles.text}>Chose currency</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.block} activeOpacity={0.8}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="message-question-outline"
          size={24}
          color="#d3d3d3"
        />
        <Text style={styles.title}>Help Center</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.block} activeOpacity={0.8}>
        <Text style={styles.title}>Rate Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.block} activeOpacity={0.8}>
        <Text style={styles.title}>Privacy policy</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.block} activeOpacity={0.8}>
        <Text style={{ ...styles.title, paddingBottom: 30 }}>Terms of Use</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <Text
        style={{
          ...styles.text,
          paddingLeft: 70,
          paddingBottom: 10,
          fontSize: 12,
        }}
      >
        ACCOUNT
      </Text>
      <TouchableOpacity style={styles.block} activeOpacity={0.8}>
        <Text style={styles.accountText}>Subscribe</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.accountText}>Sign In</Text>
      </TouchableOpacity>
      <ThemeMenu
        toggleModal={toggleModal}
        setToggleModal={showMenu}
        setThemeValue={setThemeValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  block: {
    paddingLeft: 70,
    paddingBottom: 15,
  },
  icon: { position: "absolute", left: 25 },
  title: {
    fontFamily: "RobotoMonoBold",
    fontSize: 18,
    fontWeight: "600",
    color: "#d3d3d3",
  },
  text: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    fontWeight: "400",
    color: "#d3d3d3",
  },
  accountText: {
    fontFamily: "RobotoRegular",
    fontSize: 16,
    fontWeight: "400",
    color: "#3cb371",
  },
});

export default DefaultScreenMore;
