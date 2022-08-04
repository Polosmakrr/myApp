import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useRoute} from '@react-navigation/native';

import Header from '../../../Header/Header';
import TransformationReport from './TransformationReport';

const Send = ({navigation: {goBack}, route}) => {
  const routes = useRoute();

  return (
    <View style={styles.container}>
      <Header title={'Send'} screen={routes.name} goBack={goBack} />
      <TransformationReport report={route.params} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333',
  },
});

export default Send;
