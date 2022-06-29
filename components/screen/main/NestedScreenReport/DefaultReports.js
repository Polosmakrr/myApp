import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Keyboard,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/action";
import Modal from "react-native-modal";
import Header from "../Header/Header";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const DefaultReports = ({ navigation }) => {
  const { allReport } = useSelector((state) => state.data);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [removeId, setRemoveId] = useState("");
  const [filteredReport, setFilteredReport] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredReport(allReport);
  }, [allReport]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onRemove = () => {
    setRemoveId("");
    setToggleModal(!toggleModal);
    dispatch(actions.removeReport(removeId));
  };

  const filter = (value) => {
    const filteredValue = allReport.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredReport(filteredValue);
  };

  return (
    <View style={styles.container}>
      <Header title={" Reports"} filter={filter} />
      {allReport.length !== 0 ? (
        <View>
          {filteredReport.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.item}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("CreateReport", {
                  report: item,
                  id: item.id,
                })
              }
              onLongPress={() => {
                setToggleModal(!toggleModal);
                setRemoveId(item.id);
              }}
            >
              <View>
                <Text style={styles.itemText}>{item.title}</Text>
                <Text style={{ ...styles.itemText, fontSize: 14 }}>Open</Text>
              </View>
              <Text style={styles.itemText}>{item.total} $</Text>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={{
              position: "absolute",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
              left: 0,
              right: 0,
              top: "60%",
            }}
          >
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={150}
              color={"#3cb270"}
              style={{ opacity: 0.2 }}
            />
            <Text
              style={{
                paddingTop: 30,
                width: 320,
                textAlign: "center",
                color: "#d3d3d3",
                fontFamily: "RubikRegular",
                fontWeight: "400",
                fontSize: 14,
              }}
            >
              Your reports will show up here. Tap the button below to create the
              first one!
            </Text>
          </View>
        </View>
      )}
      {!isKeyboardVisible && (
        <View style={styles.button}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.containerBtn}
            onPress={() => navigation.navigate("CreateReport")}
          >
            <Entypo name="plus" size={30} color="#d3d3d3" />
            <Text style={styles.btnTitle}>Create report</Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
      <View>
        <Modal
          animationInTiming={200}
          animationOutTiming={200}
          isVisible={toggleModal}
          backdropColor={"black"}
          onBackdropPress={() => {
            setToggleModal(!toggleModal);
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
            <TouchableOpacity
              style={{ paddingBottom: 40 }}
              activeOpacity={0.8}
              onPress={() => onRemove()}
            >
              <Text
                style={{
                  paddingTop: 5,
                  paddingBottom: 5,
                  fontFamily: "RobotoRegular",
                  fontWeight: "400",
                  fontSize: 18,
                  color: "#d3d3d3",
                  paddingLeft: 40,
                }}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  item: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemText: {
    fontFamily: "RobotoRegular",
    fontWeight: "400",
    fontSize: 18,
    color: "#d3d3d3",
  },
  button: {
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

export default DefaultReports;
