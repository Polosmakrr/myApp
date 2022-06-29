import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useSelector } from "react-redux";
import Header from "../../Header/Header";
import { useRoute } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";

const ChoseExpenses = ({ navigation: { goBack, navigate }, route }) => {
  const { allExpenses } = useSelector((state) => state.data);
  const [filteredExpenses, setFilteredExpenses] = useState(allExpenses);
  const routes = useRoute();

  useEffect(() => {
    if (route.params) {
      const chosedId = route.params.items.map((item) => item.id);
      setFilteredExpenses(
        allExpenses.filter((item) => !chosedId.includes(item.id))
      );
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Header title={"Expenses"} screen={routes.name} goBack={goBack} />
      <View style={styles.expensesBlock}>
        {filteredExpenses.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.expensesBlockItem}
            onPress={() => {
              navigate("CreateReport", { item: item });
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
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
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

export default ChoseExpenses;
