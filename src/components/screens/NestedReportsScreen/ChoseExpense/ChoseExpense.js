import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {useRoute} from '@react-navigation/native';

import Header from '../../../Header/Header';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ChoseExpenses = ({navigation: {goBack, navigate}, route}) => {
  const {allExpenses} = useSelector(state => state.data);
  const [filteredExpenses, setFilteredExpenses] = useState(allExpenses);
  const routes = useRoute();

  useEffect(() => {
    if (route.params) {
      const chosedId = route.params.items.map(item => item.id);
      setFilteredExpenses(
        allExpenses.filter(item => !chosedId.includes(item.id)),
      );
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <Header title={'Expenses'} screen={routes.name} goBack={goBack} />
      <View style={styles.expensesBlock}>
        {filteredExpenses.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.expensesBlockItem}
            onPress={() => {
              navigate('CreateReport', {item: item});
            }}>
            <View style={{flexDirection: 'row'}}>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
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

export default ChoseExpenses;
