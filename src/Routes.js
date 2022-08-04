import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text} from 'react-native';

import ExpensesScreen from './components/screens/NestedExpensesScreen/ExpensesScreen';
import MoreScreen from './components/screens/NestedMoreScreen/MoreScreen';
import ReportsScreen from './components/screens/NestedReportsScreen/ReportsScreen';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const MainTab = createBottomTabNavigator();

const Routes = () => {
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarStyle: {
          height: 70,
          paddingBottom: 15,
          paddingTop: 10,
          backgroundColor: '#696969',
        },
        tabBarHideOnKeyboard: true,
      }}>
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                ...styles.text,
                color: focused ? '#3cb371' : '#d3d3d3',
              }}>
              Expenses
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="credit-card"
              size={24}
              color={focused ? '#3cb371' : '#d3d3d3'}
            />
          ),
        }}
        name="ExpensesScreen"
        component={ExpensesScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                ...styles.text,
                color: focused ? '#3cb371' : '#d3d3d3',
              }}>
              Reports
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={24}
              color={focused ? '#3cb371' : '#d3d3d3'}
            />
          ),
        }}
        name="ReportsScreen"
        component={ReportsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarLabel: ({focused}) => (
            <Text
              style={{
                ...styles.text,
                color: focused ? '#3cb371' : '#d3d3d3',
              }}>
              More
            </Text>
          ),
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name="more-horiz"
              size={24}
              color={focused ? '#3cb371' : '#d3d3d3'}
            />
          ),
        }}
        name="MoreScreen"
        component={MoreScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'RobotoBold',
    fontWeight: '900',
    fontSize: 14,
  },
});

export default Routes;
