import React from 'react';
import {useRoute} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import * as actions from '../../../../redux/action';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';

import Header from '../../Header/Header';

import Ionicons from 'react-native-vector-icons/Ionicons';

const Currency = ({navigation: {navigate, goBack}}) => {
  const {allCurrency, choseCurrency} = useSelector(state => state.data);
  const [filteredCurrency, setFilteredCurrency] = useState(allCurrency);
  const route = useRoute();
  const dispatch = useDispatch();

  const filter = value => {
    const filteredValue = Object.values(allCurrency).filter(item =>
      item.name.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredCurrency(filteredValue);
  };

  const goBackDefault = () => {
    navigate('DefaultMore');
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Currency'}
        goBack={goBackDefault}
        screen={route.name}
        filter={filter}
      />
      <ScrollView style={styles.currencyBlock}>
        {Object.values(filteredCurrency).map((item, index) => (
          <TouchableOpacity
            style={styles.item}
            key={index}
            onPress={() => {
              goBack();
              dispatch(actions.choseCurrency(item));
            }}>
            <View
              style={{
                flexDirection: 'row',
                paddingLeft: 10,
              }}>
              <Image
                style={{
                  widht: 20,
                  height: 20,
                  resizeMode: 'contain',
                  paddingLeft: 45,
                }}
                source={{
                  uri: `data:image/gif;base64,${item.flag}`,
                }}
              />
              <Text style={styles.itemText}>
                {item.name.length > 25
                  ? item.name.slice(0, 25) + '...'
                  : item.name}
              </Text>
            </View>
            {item.id === choseCurrency.id && (
              <Ionicons name="checkmark-sharp" size={24} color="green" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
  currencyBlock: {
    flex: 1,
    paddingTop: 10,
  },
  item: {
    flexDirection: 'row',
    paddingBottom: 20,
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  itemText: {
    fontFamily: 'RubikRegular',
    fontWeight: '400',
    fontSize: 16,
    color: '#fff',
    paddingLeft: 10,
  },
});

export default Currency;
