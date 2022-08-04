import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';

import {authSignUpUser} from '../../../../redux/auth/authOperation';
import Header from '../../Header/Header';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const initialState = {
  name: '',
  email: '',
  password: '',
};

const SignUp = ({navigation: {navigate}}) => {
  const [isShowPasswordIcon, setIsShowPasswordIcon] = useState('eye');
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [state, setstate] = useState(initialState);

  const route = useRoute();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate('DefaultMore');
  };

  const showPassword = () => {
    if (isShowPassword) {
      setIsShowPasswordIcon('eye-off');
      setIsShowPassword(false);
      return;
    }
    setIsShowPasswordIcon('eye');
    setIsShowPassword(true);
  };

  const onSubmit = () => {
    dispatch(authSignUpUser(state));
    setIsShowPassword(true);
    setIsShowPasswordIcon('eye');
    setstate(initialState);
    goBack();
  };

  return (
    <View style={styles.container}>
      <Header title={'Sign Up'} screen={route.name} goBack={goBack} />
      <View style={{paddingTop: 30, paddingHorizontal: '20%'}}>
        <View style={styles.inputBlock}>
          <AntDesign
            style={{
              ...styles.icon,
            }}
            name="user"
            size={24}
            color="#778899"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#778899'}
            placeholder="UserName"
            value={state.name}
            onChangeText={value =>
              setstate(prevState => ({...prevState, name: value}))
            }
          />
        </View>
        <View style={styles.inputBlock}>
          <AntDesign
            style={{
              ...styles.icon,
            }}
            name="mail"
            size={24}
            color="#778899"
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#778899'}
            placeholder="Email"
            value={state.email}
            onChangeText={value =>
              setstate(prevState => ({...prevState, email: value}))
            }
          />
        </View>
        <View style={styles.inputBlock}>
          <TouchableOpacity
            style={{
              ...styles.icon,
            }}
            onPress={showPassword}>
            <Feather name={isShowPasswordIcon} size={24} color="#778899" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#778899'}
            placeholder="Password"
            secureTextEntry={isShowPassword}
            value={state.password}
            onChangeText={value =>
              setstate(prevState => ({
                ...prevState,
                password: value,
              }))
            }
          />
        </View>
      </View>
      <TouchableOpacity style={styles.containerBtn} onPress={() => onSubmit()}>
        <Text style={styles.btnTitle}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{alignItems: 'center', paddingTop: 20}}
        onPress={() => navigate('SignIn')}>
        <Text style={{...styles.btnTitle, color: '#d3d3d3'}}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  text: {
    fontFamily: 'RubikRegular',
    fontWeight: '400',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  inputBlock: {
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    top: 5,
    zIndex: 1,
    left: '85%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    height: 40,
    borderRadius: 6,
    color: '#d3d3d3',
    paddingLeft: 10,
    paddingRight: 50,
    fontSize: 18,
    fontWeight: '400',
    fontFamily: 'RubikRegular',
  },
  containerBtn: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: '#d3d3d3',
    marginHorizontal: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'RobotoBold',
    color: '#3cb371',
  },
});

export default SignUp;
