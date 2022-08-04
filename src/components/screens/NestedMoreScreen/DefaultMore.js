import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Appearance,
  ScrollView,
  Alert,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {authSignOutUser} from '../../../../redux/auth/authOperation';
import {clearCurrency} from '../../../../redux/action';
import Header from '../../Header/Header';
import ThemeMenu from './Theme/ThemeMenu';

import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';

const DefaultMore = ({navigation}) => {
  const [toggleModal, setToggleModal] = useState(false);
  const [themeValue, setThemeValue] = useState('Dark');
  const {choseCurrency} = useSelector(state => state.data);
  const {userId, email} = useSelector(state => state.auth);

  const route = useRoute();
  const dispatch = useDispatch();

  useEffect(() => {
    let thema = Appearance.getColorScheme();
    setThemeValue(thema[0].toUpperCase() + thema.slice(1));
  }, []);

  const showMenu = () => {
    setToggleModal(!toggleModal);
  };
  return (
    <ScrollView style={styles.container}>
      <Header title={'More'} screen={route.name} />
      <Text
        style={{
          ...styles.text,
          paddingTop: 20,
          paddingBottom: 10,
          paddingLeft: 70,
          fontSize: 12,
        }}>
        SETTINGS
      </Text>
      <TouchableOpacity
        style={{...styles.block, paddingBottom: 40}}
        activeOpacity={0.8}
        onPress={() => setToggleModal(!toggleModal)}>
        {themeValue === 'Dark' && (
          <Feather
            style={{...styles.icon, top: 10}}
            name="moon"
            size={24}
            color="#d3d3d3"
          />
        )}
        {themeValue === 'Light' && (
          <Octicons
            style={{...styles.icon, top: 10}}
            name="sun"
            size={24}
            color="#d3d3d3"
          />
        )}
        <View>
          <Text style={styles.title}>Theme</Text>
          <Text style={styles.text}>{themeValue}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Categories')}>
        <FontAwesome
          style={styles.icon}
          name="th-list"
          size={24}
          color="#d3d3d3"
        />
        <Text style={styles.title}>Categories</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{...styles.block, paddingBottom: 40}}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Currency')}>
        <Ionicons
          style={{...styles.icon, top: 10}}
          name="logo-usd"
          size={24}
          color="#d3d3d3"
        />
        <View>
          <Text style={styles.title}>Currency</Text>
          {choseCurrency.length !== 0 ? (
            <Text style={styles.text}>{choseCurrency.currency.code}</Text>
          ) : (
            <Text style={styles.text}>Chose currency</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => {
          Alert.alert('Go To', 'link on `Help Center`', [
            {
              text: 'Ok',
            },
          ]);
        }}>
        <MaterialCommunityIcons
          style={styles.icon}
          name="message-question-outline"
          size={24}
          color="#d3d3d3"
        />
        <Text style={styles.title}>Help Center</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => {
          Alert.alert('Go To', 'link on `Rate Us`', [
            {
              text: 'Ok',
            },
          ]);
        }}>
        <Text style={styles.title}>Rate Us</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => {
          Alert.alert('Go To', 'link on `Privacy policy`', [
            {
              text: 'Ok',
            },
          ]);
        }}>
        <Text style={styles.title}>Privacy policy</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.block}
        activeOpacity={0.8}
        onPress={() => {
          Alert.alert('Go To', 'link on `Terms of Use`', [
            {
              text: 'Ok',
            },
          ]);
        }}>
        <Text style={{...styles.title, paddingBottom: 30}}>Terms of Use</Text>
      </TouchableOpacity>
      <Text
        style={{
          ...styles.text,
          paddingLeft: 70,
          paddingBottom: 15,
          fontSize: 12,
        }}>
        {email ? `Signed as ${email}` : 'ACCOUNT'}
      </Text>
      <TouchableOpacity style={styles.block} activeOpacity={0.8}>
        <Text style={styles.accountText}>Subscribe</Text>
      </TouchableOpacity>
      {userId ? (
        <TouchableOpacity
          style={styles.block}
          activeOpacity={0.8}
          onPress={() => {
            dispatch(authSignOutUser());
            dispatch(clearCurrency());
          }}>
          <Text style={styles.accountText}>Sign Out</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.block}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('RegistrationScreen')}>
          <Text style={styles.accountText}>Sign In</Text>
        </TouchableOpacity>
      )}
      <ThemeMenu
        toggleModal={toggleModal}
        setToggleModal={showMenu}
        setThemeValue={setThemeValue}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  block: {
    paddingLeft: 70,
    paddingBottom: 20,
  },
  icon: {position: 'absolute', left: 25},
  title: {
    fontFamily: 'RobotoMonoRegular',
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
  },
  text: {
    fontFamily: 'RobotoRegular',
    fontSize: 12,
    fontWeight: '400',
    color: '#d3d3d3',
  },
  accountText: {
    fontFamily: 'RobotoRegular',
    fontSize: 14,
    fontWeight: '400',
    color: '#3cb371',
  },
});

export default DefaultMore;
