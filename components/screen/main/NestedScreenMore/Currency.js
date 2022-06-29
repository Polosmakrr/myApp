import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import * as actions from "../../../../redux/action";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../Header/Header";

import { Ionicons } from "@expo/vector-icons";

const Currency = ({ navigation: { goBack, navigate } }) => {
  const { allCurrency, choseCurrency } = useSelector((state) => state.data);
  const [filteredCurrency, setFilteredCurrency] = useState(allCurrency);
  const route = useRoute();
  const dispatch = useDispatch();

  const filter = (value) => {
    const filteredValue = Object.values(allCurrency).filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCurrency(filteredValue);
  };

  return (
    <View style={styles.container}>
      <Header
        title={"Currency"}
        goBack={goBack}
        screen={route.name}
        filter={filter}
      />
      <ScrollView style={styles.currencyBlock}>
        {Object.values(filteredCurrency).map((item, index) => (
          <TouchableOpacity
            style={styles.item}
            key={index}
            onPress={() => {
              dispatch(actions.choseCurrency(item));
              navigate("DefaultScreenMore");
            }}
          >
            {item === choseCurrency && (
              <Ionicons name="checkmark-sharp" size={24} color="green" />
            )}
            <Text
              style={{
                ...styles.itemText,
                paddingLeft: item === choseCurrency ? 4 : 30,
              }}
            >
              ({item.code})
            </Text>
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  currencyBlock: {
    flex: 1,
    paddingTop: 30,
  },
  item: {
    flexDirection: "row",
    paddingBottom: 10,
  },
  itemText: {
    fontFamily: "RubikRegular",
    fontWeight: "400",
    fontSize: 18,
    color: "#fff",
    paddingLeft: 20,
  },
});

export default Currency;
