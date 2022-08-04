import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {authStateChangeUser} from '../redux/auth/authOperation';
import firestore from '@react-native-firebase/firestore';

import * as actions from '../redux/action';
import Routes from './Routes';

const Main = () => {
  const {data} = useSelector(state => state);
  const {userId, Name} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  useEffect(() => {
    if (userId) {
      pushDataOnServer(data, userId, Name);
    }
  }, [data]);

  useEffect(() => {
    if (userId) {
      firestore()
        .collection('User')
        .doc(userId)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            const {data} = documentSnapshot.data();

            dispatch(actions.setCategoriesFromServer(data.allCategories));
            dispatch(actions.setCurrencyFromServer(data.choseCurrency));
            dispatch(actions.setExpensesFromServer(data.allExpenses));
            dispatch(actions.setReportFromServer(data.allReport));
          } else {
            pushDataOnServer(data, userId, Name);
          }
        });
    }
  }, [userId]);

  const pushDataOnServer = (value, id, name) => {
    firestore().collection('User').doc(id).set({
      data: value,
      name: name,
      id: id,
    });
  };

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default Main;
