import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import DefaultReports from './DefaultReports';
import CreateReport from './CreateReport';
import ChoseExpenses from './ChoseExpense/ChoseExpense';
import Send from './Send/Send';

const NestedScreenReport = createStackNavigator();

const ScreenReport = ({navigation, route}) => {
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (
      routeName === 'CreateReport' ||
      routeName === 'Send' ||
      routeName === 'ChoseExpenses'
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
    <NestedScreenReport.Navigator>
      <NestedScreenReport.Screen
        options={{headerShown: false}}
        name="DefaultReports"
        component={DefaultReports}
      />
      <NestedScreenReport.Screen
        options={{headerShown: false}}
        name="CreateReport"
        component={CreateReport}
      />
      <NestedScreenReport.Screen
        options={{headerShown: false}}
        name="ChoseExpenses"
        component={ChoseExpenses}
      />
      <NestedScreenReport.Screen
        options={{headerShown: false}}
        name="Send"
        component={Send}
      />
    </NestedScreenReport.Navigator>
  );
};

export default ScreenReport;
