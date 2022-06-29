import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Appearance,
} from "react-native";
import Modal from "react-native-modal";

const ThemeMenu = ({ toggleModal, setToggleModal, setThemeValue }) => {
  return (
    <View>
      <Modal
        animationInTiming={200}
        animationOutTiming={200}
        isVisible={toggleModal}
        backdropColor={"black"}
        onBackdropPress={() => setToggleModal(toggleModal)}
        style={{ margin: 0, justifyContent: "flex-end" }}
      >
        <View
          style={{
            justifyContent: "flex-start",
            backgroundColor: "#696969",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setToggleModal(!toggleModal);
              let thema = Appearance.getColorScheme();
              setThemeValue(thema[0].toUpperCase() + thema.slice(1));
            }}
          >
            <Text style={styles.text}>System default</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setToggleModal(!toggleModal);
              setThemeValue("Dark");
            }}
          >
            <Text style={styles.text}>Dark</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setToggleModal(!toggleModal);
              setThemeValue("Light");
            }}
          >
            <Text style={{ ...styles.text, paddingBottom: 30 }}>Light</Text>
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
  text: {
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 18,
    color: "#d3d3d3",
    paddingLeft: 40,
    color: "white",
  },
});

export default ThemeMenu;
