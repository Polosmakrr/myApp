import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import Categories from "./Categories";
import Currency from "./Currency";
import DefaultScreenMore from "./DefaultScreenMore";
import SignIn from "./SignIn";

const NestedScreenMore = createStackNavigator();

const ScreenMore = ({ navigation, route }) => {
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (routeName === "Categories" || routeName === "Currency") {
      navigation.setOptions({ tabBarStyle: { display: "none" } });
    } else {
      navigation.setOptions({
        tabBarStyle: {
          display: "flex",
          height: 70,
          paddingBottom: 15,
          paddingTop: 10,
          backgroundColor: "#696969",
        },
      });
    }
  }, [route]);
  return (
    <NestedScreenMore.Navigator>
      <NestedScreenMore.Screen
        options={{ headerShown: false }}
        name="DefaultScreenMore"
        component={DefaultScreenMore}
      />
      <NestedScreenMore.Screen
        options={{ headerShown: false }}
        name="Categories"
        component={Categories}
      />
      <NestedScreenMore.Screen
        options={{ headerShown: false }}
        name="Currency"
        component={Currency}
      />
      <NestedScreenMore.Screen
        options={{ headerShown: false }}
        name="SignIn"
        component={SignIn}
      />
    </NestedScreenMore.Navigator>
  );
};

export default ScreenMore;
