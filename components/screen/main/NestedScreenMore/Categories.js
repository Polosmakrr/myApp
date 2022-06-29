import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Header from "../Header/Header";
import Button from "../Button/Button";
import CreateCategory from "./CreateCategory/CreateCategory";

const Categories = ({ navigation: { goBack } }) => {
  const { data } = useSelector((state) => state);
  const [toggleModal, setToggleModal] = useState(false);
  const [filteredCategoty, setFilteredCategory] = useState([]);
  const [willChange, setWillChange] = useState({
    value: "",
    index: "",
  });
  const route = useRoute();

  console.log("Categories", filteredCategoty);

  useEffect(() => {
    setFilteredCategory(data.allCategories);
  }, [data.allCategories]);

  const filter = (value) => {
    const filteredValue = data.allCategories.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCategory(filteredValue);
  };
  return (
    <View style={styles.container}>
      <Header
        title={"Categories"}
        goBack={goBack}
        screen={route.name}
        filter={filter}
      />
      <ScrollView style={styles.listCategories}>
        {data &&
          filteredCategoty.map((item, index) => (
            <TouchableOpacity
              style={styles.itemCategories}
              onPress={() => {
                setWillChange({
                  value: filteredCategoty[index],
                  index: index,
                });
                setToggleModal(!toggleModal);
              }}
              key={index}
            >
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View>
        <Button
          title={"Create category"}
          setToggleModal={setToggleModal}
          toggleModal={toggleModal}
        />
      </View>
      <View>
        <CreateCategory
          toggleModal={toggleModal}
          setToggleModal={setToggleModal}
          willChange={willChange}
          setWillChange={setWillChange}
        />
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

export default Categories;
