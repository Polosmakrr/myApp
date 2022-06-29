import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Alert, Text } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const MakePhoto = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    console.log("NULL");
  }
  if (hasPermission === false) {
    Alert.alert("Ooops", "Dont have access to camera!", [
      {
        text: "Ok",
      },
    ]);
    console.log("No ACCSESS");
  }

  const onSnap = async () => {
    const photo = await camera.takePictureAsync();
    navigation.navigate("CreateExpenses", { photo: photo.uri });
  };

  const flashSwitcher = () => {
    if (flash === 0) {
      setFlash(Camera.Constants.FlashMode.torch);
    }
    if (flash === 2) {
      setFlash(Camera.Constants.FlashMode.off);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      navigation.navigate("CreateExpenses", { photo: result.uri });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      {hasPermission ? (
        <Camera style={styles.camera} ref={setCamera} flashMode={flash}>
          <View style={styles.containerBtn}>
            <TouchableOpacity style={styles.buttons} onPress={pickImage}>
              <MaterialIcons
                name="add-photo-alternate"
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSnap} onPress={() => onSnap()}>
              <View
                style={{
                  backgroundColor: "#fff",
                  padding: 3,
                  borderRadius: 50,
                }}
              >
                <MaterialCommunityIcons
                  name="camera-iris"
                  size={50}
                  color="black"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => {
                flashSwitcher();
              }}
            >
              {flash === 2 ? (
                <Ionicons name="flash" size={30} color="white" />
              ) : (
                <Ionicons name="flash-off" size={30} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Text
          style={{
            fontFamily: "RubikRegular",
            fontWeight: "400",
            fontSize: 24,
            alignItems: "center",
          }}
        >
          Dont have acces to camera!
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 40,
  },
  containerBtn: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttons: { padding: 10, borderRadius: 50, backgroundColor: "grey" },
  btnSnap: { padding: 15, borderRadius: 50, backgroundColor: "grey" },
});

export default MakePhoto;
