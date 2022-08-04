import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {useRoute} from '@react-navigation/native';

import Header from '../../../Header/Header';
import {
  onGoogleButtonPress,
  onFacebookButtonPress,
} from '../../../../../redux/auth/authOperation';

const RegistrationScreen = ({navigation: {navigate}}) => {
  const route = useRoute();

  const goBack = () => {
    navigate('DefaultMore');
  };

  return (
    <View style={styles.container}>
      <Header screen={route.name} goBack={goBack} />
      <View
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: 280,
        }}>
        <Text
          style={{
            ...styles.text,
            paddingBottom: 20,
            fontSize: 24,
            color: '#fff',
          }}>
          Sign In
        </Text>

        <Text style={{...styles.text, paddingBottom: 40}}>
          Save your expenses and reports in the cloud and access them from any
          device.
        </Text>
        <TouchableOpacity
          style={styles.socialBtn}
          onPress={() => {
            onGoogleButtonPress()
              .then(() => goBack())
              .catch(error => console.log('ERROR', error));
          }}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://cdn.imgbin.com/17/10/21/google-suite-icon-google-icon-LmAAJV07.jpg',
            }}
          />

          <Text style={{...styles.text, color: '#fff', fontSize: 16}}>
            Sign In with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.socialBtn}
          onPress={() => {
            onFacebookButtonPress()
              .then(() => goBack())
              .catch(error => console.log('ERROR', error));
          }}>
          <Image
            style={styles.icon}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/2048px-Facebook_icon_2013.svg.png',
            }}
          />
          <Text style={{...styles.text, color: '#fff', fontSize: 16}}>
            Sign In with Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('SignIn')}>
          <Text style={{...styles.text, color: '#fff', fontSize: 16}}>
            {' '}
            Sign In or register with email
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingBottom: 20,
          alignItems: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: 280,
        }}>
        <Text style={{...styles.text, fontSize: 12}}>
          By signing in your confirm that you agree to our{' '}
          <Text style={{color: '#3cb371'}} onPress={() => console.log('press')}>
            Terms of Service
          </Text>{' '}
          and{' '}
          <Text style={{color: '#3cb371'}} onPress={() => console.log('press')}>
            Privacy Policy
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#333333',
  },
  text: {
    fontFamily: 'RubikRegular',
    fontWeight: '400',
    fontSize: 14,
    color: '#808080',
    textAlign: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  socialBtn: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default RegistrationScreen;
