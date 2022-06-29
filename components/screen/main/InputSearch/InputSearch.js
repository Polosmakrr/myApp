import { StyleSheet, TouchableOpacity, View, TextInput } from "react-native";
import Modal from "react-native-modal";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";

const InputSearch = ({ toggleModal, setToggleModal, filter }) => {
  const [value, setValue] = useState("");

  return (
    <View>
      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        animationInTiming={200}
        animationOutTiming={200}
        isVisible={toggleModal}
        backdropColor={"transparent"}
        style={{ margin: 0 }}
        onBackdropPress={() => {
          setToggleModal(!toggleModal);
          setValue("");
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            style={{
              backgroundColor: "#696969",
              paddingLeft: 35,
              height: 45,
              fontFamily: "RubikRegular",
              fontWeight: "400",
              fontSize: 20,
              color: "#d3d3d3",
              paddingLeft: "15%",
            }}
            placeholder="Search"
            autoFocus={true}
            onChangeText={(text) => {
              filter(text);
              setValue(text);
            }}
            onFocus={() => filter(value)}
            value={value}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setToggleModal(!toggleModal);
              setValue("");
            }}
          >
            <AntDesign
              style={{ position: "absolute", top: -35, left: 15 }}
              name="arrowleft"
              size={24}
              color="#d3d3d3"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: "#696969",
  },
  inputText: {
    backgroundColor: "#696969",
    fontFamily: "RubikRegular",
    fontWeight: "400",
    fontSize: 22,
    color: "#d3d3d3",
    paddingLeft: 40,
    color: "white",
  },
});

export default InputSearch;
