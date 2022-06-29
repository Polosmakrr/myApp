import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { Entypo } from "@expo/vector-icons";

const Button = ({ title, toggleModal, setToggleModal }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.containerBtn}
        onPress={() => setToggleModal(!toggleModal)}
      >
        <Entypo name="plus" size={30} color="#d3d3d3" />
        <Text style={styles.btnTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  containerBtn: {
    height: 50,
    width: 210,
    marginBottom: 20,
    flexDirection: "row",
    backgroundColor: "rgba(0, 120, 0, 0.6)",
    borderRadius: 25,
    borderColor: "#dcdcdc",
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    paddingLeft: 10,
    fontSize: 18,
    fontWeight: "900",
    fontFamily: "RubikBold",
    color: "#d3d3d3",
  },
});

export default Button;
