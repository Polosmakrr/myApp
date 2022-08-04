import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, TouchableOpacity, Alert} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import TextRecognition from 'react-native-text-recognition';
import RNImageManipulator from '@oguzhnatly/react-native-image-manipulator';
import {launchImageLibrary} from 'react-native-image-picker';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MakePhoto = ({navigation}) => {
  const camera = useRef(Camera);
  const [hasPermission, setHasPermission] = useState(null);

  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const [flash, setFlash] = useState('off');

  useEffect(() => {
    getPermision();
  }, []);

  const getPermision = async () => {
    const newCameraPermission = await Camera.requestCameraPermission();
    setHasPermission(newCameraPermission);
  };

  if (hasPermission === 'denied') {
    Alert.alert('Ooops', 'Dont have access to camera!', [
      {
        text: 'Allow',
        onPress: () => getPermision(),
      },
    ]);
  }
  const total = value => {
    const regDot = /\d+\.\d+/g;
    const regComs = /\d+\,\d+/g;
    let sortedArr = [];
    value.map(item => {
      if (item.match(regDot) !== null) {
        sortedArr = sortedArr.concat(item.match(regDot));
      }
      if (item.match(regComs) !== null) {
        let test = item.match(regComs);
        sortedArr = sortedArr.concat(test[0].replace(/,/, '.'));
      }
    });
    if (sortedArr.length !== 0) {
      return Math.max(...sortedArr);
    } else {
      return '';
    }
  };

  const onSnap = async () => {
    const photo = await camera.current.takePhoto({
      skipMetadata: true,
      flash: flash,
    });
    const manipResult = await RNImageManipulator.manipulate(
      `file://${photo.path}`,
      [{rotate: 0}],
      {format: 'jpg'},
    );
    const resultChanged = await TextRecognition.recognize(manipResult.uri, {
      visionIgnoreThreshold: 0.5,
    });
    const param = total(resultChanged);
    navigation.navigate('CreateExpenses', {
      photo: manipResult.uri,
      text: resultChanged,
      total: param,
    });
  };

  const flashSwitcher = () => {
    if (flash === 'on') {
      setFlash('off');
    }
    if (flash === 'off') {
      setFlash('on');
    }
  };

  const pickImage = async () => {
    let result = await launchImageLibrary({mediaType: 'photo'});
    const manipResult = await RNImageManipulator.manipulate(
      result.assets[0].uri,
      [{rotate: 0}],
      {format: 'jpg'},
    );
    const resultChanged = await TextRecognition.recognize(manipResult.uri, {
      visionIgnoreThreshold: 0.5,
    });
    const param = total(resultChanged);
    navigation.navigate('CreateExpenses', {
      photo: manipResult.uri,
      text: resultChanged,
      total: param,
    });
  };
  return (
    <View style={styles.container}>
      {devices.back !== undefined && (
        <View style={{flex: 1, width: '100%', justifyContent: 'flex-end'}}>
          <Camera
            style={styles.camera}
            ref={camera}
            device={device}
            isActive={true}
            photo={true}
            orientation={'portrait'}
          />
          <View style={styles.containerBtn}>
            <TouchableOpacity style={styles.buttons} onPress={pickImage}>
              <MaterialIcons
                name="add-photo-alternate"
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnSnap} onPress={() => onSnap()}>
              <View
                style={{
                  backgroundColor: '#fff',
                  padding: 3,
                  borderRadius: 50,
                }}>
                <MaterialCommunityIcons
                  name="camera-iris"
                  size={50}
                  color="white"
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => {
                flashSwitcher();
              }}>
              {flash === 'on' ? (
                <Ionicons name="flash" size={30} color="white" />
              ) : (
                <Ionicons name="flash-off" size={30} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  camera: {...StyleSheet.absoluteFillObject},
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 40,
  },
  buttons: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: 'rgba(236,236,236,0.6)',
  },
  btnSnap: {
    padding: 15,
    borderRadius: 50,
    backgroundColor: 'rgba(236,236,236,0.6)',
  },
});

export default MakePhoto;
