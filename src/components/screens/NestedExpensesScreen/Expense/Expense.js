import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import LargeImg from '../LargeImage/LargeImg';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Expense = ({
  nav,
  expense,
  setExpense,
  choseCurrency,
  currentCategory,
}) => {
  const [datePicker, setDatePicker] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  const onDateSelected = (event, value) => {
    setExpense({...expense, ...{date: value.toDateString()}});
    setDatePicker(!datePicker);
  };

  const vievLargeImg = () => {
    if (expense.img) {
      setToggleModal(!toggleModal);
      return;
    }
    nav.navigate('Camera');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputTitle}
        placeholderTextColor={'#d3d3d3'}
        placeholder="Merchant name"
        onChangeText={value => setExpense({...expense, ...{title: value}})}
        value={expense.title}
      />
      <View alignItems={'center'} style={{paddingBottom: 30}}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 250,
            maxWidth: '80%',
          }}
          onPress={() => vievLargeImg()}>
          {expense.img ? (
            <Image
              style={{width: 250, height: 250}}
              source={{uri: expense.img}}
            />
          ) : (
            <MaterialIcons
              name="add-photo-alternate"
              size={75}
              color="black"
              style={{opacity: 0.4}}
            />
          )}
        </TouchableOpacity>
      </View>
      <ScrollView>
        <TouchableOpacity
          style={styles.itemBlock}
          onPress={() => setDatePicker(true)}>
          <Feather
            style={styles.icon}
            name="calendar"
            size={24}
            color="#d3d3d3"
          />

          <Text style={styles.textValue}>{expense.date}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemBlock}
          onPress={() => nav.navigate('ChoseCategory')}>
          <FontAwesome
            style={styles.icon}
            name="th-list"
            size={24}
            color="#d3d3d3"
          />
          {currentCategory.length === 0 ? (
            <Text style={styles.text}>Add category</Text>
          ) : (
            <Text style={styles.text}>{currentCategory}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...styles.itemBlock,
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row'}}>
            <AntDesign
              style={styles.icon}
              name="tago"
              size={24}
              color="#d3d3d3"
            />
            <Text style={styles.text}>Total</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 30,
            }}>
            <TextInput
              style={{
                ...styles.textValue,
              }}
              placeholderTextColor={'#d3d3d3'}
              placeholder={'0, 00'}
              keyboardType="numeric"
              onChangeText={value => {
                value = value.replace(/[^\d]/g, '');
                setExpense({
                  ...expense,
                  ...{total: value},
                });
              }}
              value={expense.total.toString()}
            />
            {choseCurrency.length !== 0 && (
              <Text style={{color: '#fff', fontSize: 20, paddingLeft: 5}}>
                {choseCurrency.currency.symbol
                  ? choseCurrency.currency.symbol
                  : choseCurrency.currency.code}
              </Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.itemBlock}
          onPress={() => nav.navigate('MoreScreen', {screen: 'Currency'})}>
          <Ionicons
            style={styles.icon}
            name="logo-usd"
            size={24}
            color="#d3d3d3"
          />
          {choseCurrency.length !== 0 ? (
            <Text style={styles.textValue}>{choseCurrency.currency.code}</Text>
          ) : (
            <Text style={styles.textValue}>Chose currency</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemBlock}>
          <MaterialIcons
            style={styles.icon}
            name="playlist-add"
            size={24}
            color="#d3d3d3"
          />
          <TextInput
            style={{...styles.textValue, width: '80%'}}
            placeholderTextColor={'#d3d3d3'}
            placeholder="Add description"
            onChangeText={value =>
              setExpense({...expense, ...{description: value}})
            }
            value={expense.description}
          />
        </TouchableOpacity>
      </ScrollView>
      {datePicker && (
        <DateTimePicker
          value={new Date(expense.date)}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onDateSelected}
          style={styles.datePicker}
        />
      )}
      <View>
        {expense.img ? (
          <LargeImg
            toggleModal={toggleModal}
            setToggleModal={setToggleModal}
            img={expense.img}
          />
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  inputTitle: {
    paddingLeft: 30,
    fontFamily: 'RubikRegular',
    fontWeight: '400',
    fontSize: 24,
    color: '#fff',
  },
  itemBlock: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingBottom: 20,
    alignItems: 'center',
  },
  icon: {paddingRight: 20},
  textValue: {
    fontFamily: 'RobotoRegular',
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
    padding: 0,
  },
  text: {
    fontFamily: 'RobotoRegular',
    fontWeight: '400',
    fontSize: 14,
    color: '#d3d3d3',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});

export default Expense;
