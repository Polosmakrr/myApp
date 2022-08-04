import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import DefaultExpenses from './DefaultExpenses';
import CreateExpenses from './CreateExpenses';
import MakePhoto from './Camera/MakePhoto';
import ChoseCategory from './choseCategory/ChoseCategory';

const NestedScreenExpensens = createStackNavigator();

const ExpensesScreen = ({navigation, route}) => {
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (
      routeName === 'CreateExpenses' ||
      routeName === 'Camera' ||
      routeName === 'ChoseCategory'
    ) {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({
        tabBarStyle: {
          display: 'flex',
          height: 70,
          paddingBottom: 15,
          paddingTop: 10,
          backgroundColor: '#696969',
        },
      });
    }
  }, [route]);

  return (
    <NestedScreenExpensens.Navigator>
      <NestedScreenExpensens.Screen
        options={{headerShown: false}}
        name="DefaultExpenses"
        component={DefaultExpenses}
      />
      <NestedScreenExpensens.Screen
        options={{headerShown: false}}
        name="CreateExpenses"
        component={CreateExpenses}
      />
      <NestedScreenExpensens.Screen
        options={{headerShown: false}}
        name="Camera"
        component={MakePhoto}
      />
      <NestedScreenExpensens.Screen
        options={{headerShown: false}}
        name="ChoseCategory"
        component={ChoseCategory}
      />
    </NestedScreenExpensens.Navigator>
  );
};

export default ExpensesScreen;
