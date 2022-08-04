import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../../../redux/action';

import Alert from '../../Alert/Alert';
import Expense from './Expense/Expense';
import {generateUUID} from '../../../unicId';

import AntDesign from 'react-native-vector-icons/AntDesign';

const initExpense = {
  title: '',
  img: '',
  date: new Date().toDateString(),
  category: '',
  total: '',
  currency: '',
  description: '',
  id: null,
};

const CreateExpenses = ({navigation, route}) => {
  const {currentCategory, choseCurrency, allCurrency} = useSelector(
    state => state.data,
  );
  const [showAlert, setShowAlert] = useState(false);
  const [expense, setExpense] = useState(initExpense);
  const [idExpense, setIdExpense] = useState('');

  const defaultCurrency = Object.values(allCurrency).filter(
    item => item.name === 'United States',
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setExpense({
      ...expense,
      ...{category: currentCategory},
    });
  }, [currentCategory]);

  useEffect(() => {
    setExpense({
      ...expense,
      ...{currency: choseCurrency},
    });
  }, [choseCurrency]);

  useEffect(() => {
    setExpense(
      {
        ...expense,
        ...{id: generateUUID(10), ...{currency: choseCurrency}},
      },
      [],
    );

    if (route.params) {
      if (route.params.expense) {
        setIdExpense(route.params.id);
        setExpense(route.params.expense);
        dispatch(actions.choseCategory(route.params.expense.category));
        dispatch(actions.choseCurrency(route.params.expense.currency));
        return;
      }
    }
  }, []);

  useEffect(() => {
    if (route.params) {
      if (route.params.photo) {
        setExpense({
          ...expense,
          ...{
            img: route.params.photo,
            title: route.params.text[0],
            total: route.params.total,
            id: generateUUID(10),
            currency: choseCurrency,
          },
        });
      }
    }
  }, [route.params]);

  const onClose = () => {
    setShowAlert(!showAlert);
    setExpense(initExpense);
    dispatch(actions.clearCurrent());
    setIdExpense(null);
    navigation.navigate('DefaultExpenses');
  };

  const onSave = () => {
    if (expense.title) {
      if (expense.total === '') {
        expense.total = '0.00';
      }
      if (choseCurrency.length === 0) {
        expense.currency = defaultCurrency[0];
      }
      if (idExpense !== '') {
        dispatch(actions.editExpense({id: idExpense, expense}));
        dispatch(actions.clearCurrent());
        setExpense(initExpense);
        setIdExpense('');
        navigation.navigate('DefaultExpenses');
        return;
      }
      dispatch(actions.addExpense({...expense}));
      dispatch(actions.clearCurrent());
      setExpense(initExpense);
      navigation.navigate('DefaultExpenses');
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={styles.headerMenu}
          alignItems={'center'}
          justifyContent={'space-between'}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowAlert(!showAlert)}>
            <AntDesign name="close" size={24} color="#d3d3d3" />
          </TouchableOpacity>

          {expense && (
            <TouchableOpacity
              style={{
                ...styles.buttonSave,
                backgroundColor: expense.title ? '#3cb371' : '#808080',
              }}
              activeOpacity={0.8}
              onPress={() => onSave()}>
              <Text style={styles.buttonSaveText}>Save</Text>
            </TouchableOpacity>
          )}
          {showAlert && (
            <Alert
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              onClose={onClose}
            />
          )}
        </View>
      </View>
      <Expense
        nav={navigation}
        expense={expense}
        setExpense={setExpense}
        choseCurrency={choseCurrency}
        currentCategory={currentCategory}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  header: {
    height: 50,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    backgroundColor: '#333333',
  },
  headerMenu: {
    flexDirection: 'row',
  },
  buttonSave: {borderRadius: 5, paddingVertical: 5, paddingHorizontal: 10},
  buttonSaveText: {
    fontFamily: 'RubikRegular',
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
  },
});

export default CreateExpenses;
