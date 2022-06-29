import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../../redux/action";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../../Header/Header";
import { useState } from "react";

const ChoseCategory = ({ navigation: { goBack } }) => {
  const route = useRoute();
  const { data } = useSelector((state) => state);
  const [filteredCategoty, setFilteredCategory] = useState(data.allCategories);
  const dispatch = useDispatch();

  const onChose = (value) => {
    dispatch(actions.choseCategory(value));
    goBack();
  };

  const filter = (value) => {
    const filteredValue = data.allCategories.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategory(filteredValue);
  };
  return (
    <View style={styles.container}>
      <Header
        title={"Chose Category"}
        goBack={goBack}
        screen={route.name}
        filter={filter}
      />
      <ScrollView style={styles.listCategories}>
        {data &&
          filteredCategoty.map((item, index) => (
            <TouchableOpacity
              style={styles.itemCategories}
              key={index}
              onPress={() => onChose(item)}
            >
              <Text style={styles.itemText}>{item}</Text>
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
  listCategories: {
    flex: 1,
    paddingHorizontal: 30,
    marginTop: 30,
  },
  itemCategories: {
    paddingBottom: 20,
  },
  itemText: {
    fontFamily: "RubikRegular",
    fontWeight: "400",
    fontSize: 18,
    color: "#fff",
  },
});

export default ChoseCategory;
