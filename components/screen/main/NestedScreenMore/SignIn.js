import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

const SignIn = ({ navigation: { goBack } }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          height: 70,
          paddingHorizontal: 20,
          justifyContent: "flex-end",
        }}
        onPress={() => goBack()}
      >
        <AntDesign name="close" size={24} color="#d3d3d3" />
      </TouchableOpacity>

      <Text style={styles.text}>LogIn</Text>

      <TouchableOpacity
        style={{
          height: 70,
          paddingHorizontal: 20,
          justifyContent: "flex-end",
        }}
      >
        <Text>LogIn with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",
  },
  text: {
    fontFamily: "RubikRegular",
    fontWeight: "400",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
});

export default SignIn;
