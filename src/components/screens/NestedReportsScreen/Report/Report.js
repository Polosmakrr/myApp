import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Report = ({
  navigate,
  chosedExpenses,
  date,
  setDate,
  reportName,
  setReportName,
  total,
}) => {
  const [datePicker, setDatePicker] = useState(false);

  const onDateSelected = (event, value) => {
    setDate(value);
    setDatePicker(!datePicker);
  };

  return (
    <View>
      <View
        style={{
          paddingTop: 20,
          paddingBottom: 20,
          borderBottomWidth: 0.2,
          borderBottomColor: 'white',
        }}>
        <TextInput
          style={styles.reportName}
          placeholder="Report name"
          onChangeText={setReportName}
          value={reportName}
        />
      </View>
      <TouchableOpacity
        style={{
          ...styles.block,
          borderBottomWidth: 0.2,
          borderBottomColor: 'white',
        }}
        onPress={() => setDatePicker(true)}>
        <Feather
          style={styles.icon}
          name="calendar"
          size={24}
          color="#d3d3d3"
        />
        <Text style={styles.text}>{date.toDateString()}</Text>
      </TouchableOpacity>
      <ScrollView>
        {chosedExpenses.map((item, index) => (
          <View
            key={index}
            style={{...styles.block, justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.text}>{item.title}</Text>
              <Text style={styles.text}>{item.category}</Text>
            </View>
            <View>
              <Text style={styles.text}>
                {Number(item.total).toFixed(2)}{' '}
                {item.currency.length !== 0 && item.currency.currency.symbol}
              </Text>
              {item.currency.length !== 0 &&
                item.currency.currency.code !== 'USD' && (
                  <Text style={{...styles.text, fontSize: 12}}>
                    1$ = {(1 / item.currency.currency.rate).toFixed(6)}
                    {item.currency.currency.code}
                  </Text>
                )}
            </View>
          </View>
        ))}

        <View>
          <TouchableOpacity
            style={styles.block}
            onPress={() =>
              navigate('ChoseExpenses', {
                items: chosedExpenses,
              })
            }>
            <MaterialIcons
              style={styles.icon}
              name="post-add"
              size={24}
              color="#3cb371"
            />
            <Text style={{...styles.text, color: '#3cb371'}}>Add expense</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 30,
            paddingRight: 20,
            backgroundColor: '#a9a9a9',
          }}>
          <Text style={styles.text}>Total</Text>
          <Text style={styles.text}>$ {total.toFixed(2)}</Text>
        </View>
      </ScrollView>
      {datePicker && (
        <DateTimePicker
          value={date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onDateSelected}
          style={styles.datePicker}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reportName: {
    fontFamily: 'RubikRegular',
    fontWeight: '400',
    fontSize: 24,
    color: '#fff',
    paddingLeft: 30,
    paddingRight: 30,
  },
  block: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  icon: {paddingRight: 20},
  text: {
    fontFamily: 'RobotoRegular',
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});

export default Report;
