import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import InputSearch from '../InputSearch/InputSearch';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = ({goBack, title, screen, filter}) => {
  const [toggleModal, setToggleModal] = useState(false);

  const showInput = () => {
    setToggleModal(!toggleModal);
  };

  const previos = () => {
    if (
      screen === 'Categories' ||
      screen === 'Currency' ||
      screen === 'ChoseCategory' ||
      screen === 'ChoseExpenses' ||
      screen === 'Send' ||
      screen === 'SignIn' ||
      screen === 'SignUp' ||
      screen === 'RegistrationScreen'
    ) {
      goBack();
    } else {
      return;
    }
  };
  return (
    <View
      style={{
        ...styles.header,
        backgroundColor: toggleModal ? '#696969' : '#333333',
      }}>
      {screen !== 'DefaultMore' ? (
        <View
          style={styles.headerMenu}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => previos()}
            style={{}}>
            <AntDesign
              style={{
                color:
                  screen === 'Categories' ||
                  screen === 'Currency' ||
                  screen === 'ChoseExpenses' ||
                  screen === 'ChoseCategory' ||
                  screen === 'Send' ||
                  screen === 'SignIn' ||
                  screen === 'SignUp' ||
                  screen === 'RegistrationScreen'
                    ? '#d3d3d3'
                    : 'transparent',
              }}
              name={
                screen === 'SignUp' ||
                screen === 'SignIn' ||
                screen === 'RegistrationScreen'
                  ? 'close'
                  : 'arrowleft'
              }
              size={24}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>{title}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={() => showInput()}>
            {screen !== 'Send' &&
              screen !== 'SignIn' &&
              screen !== 'SignUp' &&
              screen !== 'RegistrationScreen' && (
                <FontAwesome name="search" size={20} color="#d3d3d3" />
              )}
          </TouchableOpacity>
        </View>
      ) : (
        <View alignItems={'center'}>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      )}
      <View style={{flex: 1}}>
        <InputSearch
          toggleModal={toggleModal}
          setToggleModal={showInput}
          filter={filter}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
    paddingHorizontal: 20,
    paddingTop: '5%',
  },
  headerMenu: {
    flexDirection: 'row',
  },
  headerTitle: {
    fontFamily: 'RubikRegular',
    fontWeight: '400',
    fontSize: 18,
    color: '#d3d3d3',
  },
});

export default Header;
