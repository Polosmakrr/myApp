import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Keyboard,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../../../redux/action';

import Header from '../../Header/Header';
import Button from '../../Button/Button';
import ExpensesMenu from './Menu/ExpensesMenu';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DefaultExpenses = ({navigation}) => {
  const {allExpenses} = useSelector(state => state.data);
  const dispatch = useDispatch();

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);
  const [removeId, setRemoveId] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  useEffect(() => {
    setFilteredExpenses(allExpenses);
  }, [allExpenses]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const showMenu = () => {
    setToggleModal(!toggleModal);
  };

  const scan = () => {
    setToggleModal(!toggleModal);
    navigation.navigate('Camera');
  };

  const create = () => {
    setToggleModal(!toggleModal);
    navigation.navigate('CreateExpenses');
  };

  const onRemove = () => {
    setRemoveId('');
    setToggleModal(!toggleModal);
    dispatch(actions.removeExpense(removeId));
  };

  const filter = value => {
    const filteredValue = allExpenses.filter(item =>
      item.title.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredExpenses(filteredValue);
  };

  return (
    <View style={styles.container}>
      <Header title={'Expenses'} filter={filter} />
      {allExpenses.length !== 0 ? (
        <ScrollView style={styles.expensesBlock}>
          {filteredExpenses.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.expensesBlockItem}
              onLongPress={() => {
                setRemoveId(item.id);
                setToggleModal(!toggleModal);
              }}
              onPress={() => {
                navigation.navigate('CreateExpenses', {
                  expense: item,
                  id: item.id,
                });
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.expensesBlockImg}>
                  {item.img ? (
                    <Image
                      style={{width: 30, height: 40}}
                      source={{uri: item.img}}
                    />
                  ) : (
                    <FontAwesome
                      name="file-picture-o"
                      size={35}
                      color="#d3d3d3"
                    />
                  )}
                </View>
                <View>
                  <Text style={styles.expensesBlockTitle}>
                    {item.title.length > 16
                      ? item.title.slice(0, 14) + '...'
                      : item.title}
                  </Text>
                  <Text style={styles.expensesBlockText}>{item.category}</Text>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.expensesBlockTotal}>
                  {Number(item.total).toFixed(2)}
                </Text>
                {item.currency.length !== 0 && (
                  <Text style={{...styles.expensesBlockTotal, paddingLeft: 4}}>
                    {item.currency.currency.symbol
                      ? item.currency.currency.symbol
                      : item.currency.currency.code}
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.emptyBlock}>
            <MaterialIcons
              name="credit-card"
              size={150}
              color={'#3cb270'}
              style={{opacity: 0.2}}
            />
            <Text style={styles.emptyBlockText}>
              Your expenses will show up here. Tap the button below to create
              the first one!
            </Text>
          </View>
        </View>
      )}
      {!isKeyboardVisible && (
        <Button
          title={'Create expense'}
          setToggleModal={setToggleModal}
          toggleModal={toggleModal}
        />
      )}
      <ExpensesMenu
        toggleModal={toggleModal}
        setToggleModal={showMenu}
        create={create}
        scan={scan}
        removeId={removeId}
        setRemoveId={setRemoveId}
        onRemove={onRemove}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  emptyBlock: {
    position: 'absolute',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    right: 0,
    top: '60%',
  },
  emptyBlockText: {
    paddingTop: 30,
    width: 320,
    textAlign: 'center',
    color: '#d3d3d3',
    fontFamily: 'RubikRegular',
    fontWeight: '400',
    fontSize: 14,
  },
  expensesBlock: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  expensesBlockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  expensesBlockImg: {paddingRight: 20},
  expensesBlockTitle: {
    fontFamily: 'RobotoRegular',
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
  },
  expensesBlockText: {
    fontFamily: 'RobotoRegular',
    fontWeight: '400',
    fontSize: 12,
    color: '#d3d3d3',
  },
  expensesBlockTotal: {
    fontFamily: 'RobotoRegular',
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
  },
});

export default DefaultExpenses;
