import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';

const Button = ({title, toggleModal, setToggleModal}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.containerBtn}
        onPress={() => setToggleModal(!toggleModal)}>
        <Entypo name="plus" size={25} color="#d3d3d3" />
        <Text style={styles.btnTitle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerBtn: {
    height: 50,
    paddingHorizontal: 20,
    marginBottom: 20,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 120, 0, 0.6)',
    borderRadius: 25,
    borderColor: '#dcdcdc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTitle: {
    paddingLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'RubikRegular',
    color: '#d3d3d3',
  },
});

export default Button;
