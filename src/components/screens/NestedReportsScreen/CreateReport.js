import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from '../../../../redux/action';

import Report from './Report/Report';
import Alerts from '../../Alert/Alert';
import {generateUUID} from '../../../unicId';

import AntDesign from 'react-native-vector-icons/AntDesign';

const CreateReport = ({navigation: {navigate, goBack}, route}) => {
  const {amountReport} = useSelector(state => state.data);

  const [chosedExpenses, setChosedExpenses] = useState([]);
  const [date, setDate] = useState(new Date());
  const [reportName, setReportName] = useState(
    `Report # ${amountReport.amount}`,
  );
  const [idReport, setIdReport] = useState('');
  const [total, setTotal] = useState(Number);
  const [showAlert, setShowAlert] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (route.params) {
      if (route.params.report) {
        setIdReport(route.params.id);
        setChosedExpenses(route.params.report.item);
        setReportName(route.params.report.title);
        setTotal(route.params.report.total);
        setDate(new Date(route.params.report.date));
      }
      if (route.params.item) {
        setChosedExpenses(chosedExpenses.concat(route.params.item));

        return;
      }
    }
  }, [route.params]);

  useEffect(() => {
    const value = chosedExpenses.reduce((prev, item) => {
      return prev + (1 / item.currency.currency.rate) * item.total;
    }, 0);
    setTotal(value);
  }, [chosedExpenses]);

  const onSave = sending => {
    if (!reportName) {
      Alert.alert('Error', 'Report name can`t be empty!', [
        {
          text: 'Ok',
        },
      ]);
      return;
    }
    if (chosedExpenses.length === 0) {
      Alert.alert('Error', 'Please chose expense', [
        {
          text: 'Ok',
        },
      ]);
      return;
    }
    const report = {
      date: date.toDateString(),
      title: reportName,
      total: total,
      item: chosedExpenses,
      id: generateUUID(10),
    };
    if (idReport !== '') {
      dispatch(actions.editReport({id: idReport, report}));
      setIdReport('');
      if (sending) {
        navigate('Send', {report});
      } else {
        goBack();
      }
      return;
    }

    dispatch(actions.increment());

    dispatch(actions.addReport(report));
    if (sending) {
      navigate('Send', {report});
    } else {
      goBack();
    }
  };

  const onClose = () => {
    setShowAlert(!showAlert);
    goBack();
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
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                ...styles.buttonSave,
                backgroundColor: '#808080',
                marginRight: 10,
              }}
              activeOpacity={0.8}
              onPress={() => {
                onSave();
              }}>
              <Text style={styles.buttonSaveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...styles.buttonSave,
                backgroundColor: '#3cb371',
              }}
              activeOpacity={0.8}
              onPress={() => {
                const sending = true;
                onSave(sending);
              }}>
              <Text style={styles.buttonSaveText}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Report
        navigate={navigate}
        chosedExpenses={chosedExpenses}
        date={date}
        setDate={setDate}
        reportName={reportName}
        setReportName={setReportName}
        total={total}
      />
      {showAlert && (
        <Alerts
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          onClose={onClose}
        />
      )}
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

export default CreateReport;
