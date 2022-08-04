import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View, TextInput} from 'react-native';
import Modal from 'react-native-modal';

import AntDesign from 'react-native-vector-icons/AntDesign';

const InputSearch = ({toggleModal, setToggleModal, filter}) => {
  const [value, setValue] = useState('');

  return (
    <View>
      <Modal
        animationIn="slideInRight"
        animationOut="slideOutRight"
        animationInTiming={200}
        animationOutTiming={200}
        isVisible={toggleModal}
        backdropColor={'transparent'}
        style={{margin: 0}}
        onBackdropPress={() => {
          setToggleModal(!toggleModal);
          setValue('');
        }}>
        <View style={{flex: 1}}>
          <TextInput
            style={styles.inputText}
            placeholder="Search"
            autoFocus={true}
            onChangeText={text => {
              filter(text);
              setValue(text);
            }}
            onFocus={() => filter(value)}
            value={value}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setToggleModal(!toggleModal);
              setValue('');
            }}>
            <AntDesign
              style={styles.icon}
              name="arrowleft"
              size={24}
              color="#d3d3d3"
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },
  modalView: {
    backgroundColor: '#696969',
  },
  inputText: {
    backgroundColor: '#696969',
    fontFamily: 'RubikRegular',
    fontWeight: '400',
    paddingLeft: 50,
    height: 50,
    fontSize: 18,
    color: '#fff',
  },
  icon: {
    position: 'absolute',
    top: -37,
    left: 15,
  },
});

export default InputSearch;
