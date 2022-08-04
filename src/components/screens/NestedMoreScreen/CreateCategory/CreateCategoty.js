import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native';
import Modal from 'react-native-modal';

import * as actions from '../../../../../redux/action';

const CreateCategory = ({
  toggleModal,
  setToggleModal,
  willChange,
  setWillChange,
}) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (willChange.value !== '') {
      setValue(willChange.value);
    }
  }, [willChange]);

  const save = () => {
    if (value) {
      if (willChange.value !== '') {
        dispatch(actions.changeCategory({index: willChange.index, value}));
        setToggleModal(!toggleModal);
        setWillChange({
          value: '',
          index: '',
        });
        return;
      }
      dispatch(actions.addCategory(value));
      setToggleModal(!toggleModal);
      setValue('');
      setWillChange({
        value: '',
        index: '',
      });
    } else {
      return;
    }
  };

  return (
    <View>
      <Modal
        animationInTiming={200}
        animationOutTiming={200}
        isVisible={toggleModal}
        backdropColor={'black'}
        onBackdropPress={() => setToggleModal(!toggleModal)}
        style={{margin: 0, justifyContent: 'flex-end'}}>
        <View
          style={{
            justifyContent: 'flex-start',
            backgroundColor: '#696969',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingTop: 10,
          }}>
          <View
            style={styles.headerMenu}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Text style={styles.text}>Category</Text>

            <TouchableOpacity
              style={{
                ...styles.buttonSave,
                backgroundColor: value !== '' ? '#3cb371' : '#808080',
              }}
              activeOpacity={0.8}
              onPress={() => {
                save();
              }}>
              <Text style={styles.buttonSaveText}>Save</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={{
              ...styles.text,
              paddingLeft: 30,
              paddingBottom: 20,
              paddingTop: 20,
              paddingRight: 30,
            }}
            onChangeText={setValue}
            value={value}
            placeholder={'Enter category name'}
            placeholderTextColor={'#d3d3d3'}
            autoFocus={true}
          />
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
  text: {
    paddingTop: 5,
    paddingBottom: 5,
    fontFamily: 'RobotoRegular',
    fontWeight: '400',
    fontSize: 16,
    color: 'white',
  },
  headerMenu: {
    flexDirection: 'row',
    paddingHorizontal: 40,
    borderBottomColor: '#333333',
    borderBottomWidth: 0.2,
    paddingBottom: 10,
  },
  buttonSave: {
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  buttonSaveText: {
    fontFamily: 'RubikRegular',
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
  },
});

export default CreateCategory;
