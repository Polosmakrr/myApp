import { useRoute } from "@react-navigation/native";
import { StyleSheet, View, Text } from "react-native";

const ReportsLimitIsOver = ({ navigation: { goBack } }) => {
  const route = useRoute();

  return (
    <View style={styles.container}>
      <Text>Report Limit is Over</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#333333",

    justifyContent: "center",
    alignItems: "center",
  },
});

export default ReportsLimitIsOver;
