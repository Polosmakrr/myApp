import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text } from "react-native";

import ScreenExpenses from "./screen/main/NestedScreenExpenses/ScreenExpenses";
import ScreenReports from "./screen/main/NestedScreenReport/ScreenReports";
import ScreenMore from "./screen/main/NestedScreenMore/ScreenMore";

import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

const Routes = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          paddingBottom: 15,
          paddingTop: 10,
          backgroundColor: "#696969",
        },
        tabBarHideOnKeyboard: true,
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                ...styles.text,
                color: focused ? "#3cb371" : "#d3d3d3",
              }}
            >
              Expenses
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="credit-card"
              size={24}
              color={focused ? "#3cb371" : "#d3d3d3"}
            />
          ),
        }}
        name="ScreenExpenses"
        component={ScreenExpenses}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                ...styles.text,
                color: focused ? "#3cb371" : "#d3d3d3",
              }}
            >
              Reports
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={24}
              color={focused ? "#3cb371" : "#d3d3d3"}
            />
          ),
        }}
        name="ScreenReports"
        component={ScreenReports}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                ...styles.text,
                color: focused ? "#3cb371" : "#d3d3d3",
              }}
            >
              More
            </Text>
          ),
          tabBarIcon: ({ focused }) => (
            <MaterialIcons
              name="more-horiz"
              size={24}
              color={focused ? "#3cb371" : "#d3d3d3"}
            />
          ),
        }}
        name="ScreenMore"
        component={ScreenMore}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "RobotoBold",
    fontWeight: "900",
    fontSize: 14,
  },
});

export default Routes;
