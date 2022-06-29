import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Modal from "react-native-modal";

const ExpensesMenu = ({
  toggleModal,
  setToggleModal,
  create,
  scan,
  removeId,
  setRemoveId,
  onRemove,
}) => {
  return (
    <View>
      <Modal
        animationInTiming={200}
        animationOutTiming={200}
        isVisible={toggleModal}
        backdropColor={"black"}
        onBackdropPress={() => {
          setToggleModal(toggleModal);
          setRemoveId("");
        }}
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
          {removeId !== "" ? (
            <TouchableOpacity
              style={{ paddingBottom: 40 }}
              activeOpacity={0.8}
              onPress={() => {
                onRemove();
              }}
            >
              <Text style={styles.text}>Delete</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <TouchableOpacity activeOpacity={0.8} onPress={() => scan()}>
                <Text style={styles.text}>Scan a receipt</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => create()}>
                <Text style={{ ...styles.text, paddingBottom: 30 }}>
                  Create manualy
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 18,
    color: "#d3d3d3",
    paddingLeft: 40,
  },
});

export default ExpensesMenu;
