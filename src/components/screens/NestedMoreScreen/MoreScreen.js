import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

import DefaultMore from './DefaultMore';
import Categories from './Categories';
import Currency from './Currency';
import RegistrationScreen from './SIgnIn/RegistrationScreen';
import SignIn from './SignIn';
import SignUp from './SignUp';

const NestedScreenMore = createStackNavigator();

const ScreenMore = ({navigation, route}) => {
  useEffect(() => {
    const routeName = getFocusedRouteNameFromRoute(route);

    if (
      routeName === 'Categories' ||
      routeName === 'Currency' ||
      routeName === 'SignIn' ||
      routeName === 'SignUp' ||
      routeName === 'RegistrationScreen'
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
    <NestedScreenMore.Navigator>
      <NestedScreenMore.Screen
        options={{headerShown: false}}
        name="DefaultMore"
        component={DefaultMore}
      />
      <NestedScreenMore.Screen
        options={{headerShown: false}}
        name="Categories"
        component={Categories}
      />
      <NestedScreenMore.Screen
        options={{headerShown: false}}
        name="Currency"
        component={Currency}
      />
      <NestedScreenMore.Screen
        options={{headerShown: false}}
        name="SignIn"
        component={SignIn}
      />
      <NestedScreenMore.Screen
        options={{headerShown: false}}
        name="SignUp"
        component={SignUp}
      />
      <NestedScreenMore.Screen
        options={{headerShown: false}}
        name="RegistrationScreen"
        component={RegistrationScreen}
      />
    </NestedScreenMore.Navigator>
  );
};

export default ScreenMore;
