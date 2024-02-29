import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { ref, onValue, off, get } from "firebase/database";
import { db } from '../components/config.jsx';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import { LinearGradient } from 'expo-linear-gradient';

const ShowTemp = () => {
  const [data, setData] = useState(null);
  const [alertShown, setAlertShown] = useState(false);
  const [soundObject, setSoundObject] = useState(null);

  useEffect(() => {
    const dataRef = ref(db, '/users/kettle');

    const unsubscribe = onValue(dataRef, (snapshot) => {
      const data = snapshot.val();
      if (data && 'currentTemperature' in data && 'kettleAppInputTemp' in data) {
        const { currentTemperature, kettleAppInputTemp } = data;
        const currentTempInt = parseInt(currentTemperature);
        const inputTempInt = parseInt(kettleAppInputTemp);
        setData(currentTempInt);
        checkTemperatureEquality(currentTempInt, inputTempInt);
      }
    });

    return () => {
      off(dataRef, 'value', unsubscribe);
    };
  }, []);



  const ringtoneUri = Asset.fromModule(require('../images/ringtone.mp3')).uri;

  const checkTemperatureEquality = async (currentTemp, inputTemp) => {
    try {
      if (currentTemp !== null && inputTemp !== null && currentTemp === inputTemp && !alertShown) {
        const sound = new Audio.Sound();
        await sound.loadAsync({ uri: ringtoneUri });
        await sound.playAsync();
        setSoundObject(sound);
        showAlert();
        setAlertShown(true);
      }
    } catch (error) {
      console.error('Error checking temperature equality:', error);
    }
  };

  const stopRingtone = async () => {
    if (soundObject !== null) {
      await soundObject.stopAsync();
      setAlertShown(false);
    }
  };

  const showAlert = () => {
    Alert.alert(
      'Water Temperature Alert',
      'The water temperature has reached the desired level. You can now enjoy your hot beverage!',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  };

  return (
    <LinearGradient
      colors={['#0077c0','white', '#abd8ea','#0077c0']}
      style={styles.container}
    >
      <View style={styles.container}>
        <ImageBackground source={require('../images/drop.png')} style={styles.backgroundImage}>
          <Text style={styles.text}>{data} °C</Text>
        </ImageBackground>

        <Text style={styles.temperatureText}>Current Temperature of the Kettle</Text>

        {alertShown && (
          <TouchableOpacity style={styles.stopButton} onPress={stopRingtone}>
            <Text style={styles.buttonText}>Stop Ringing</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  backgroundImage: {
    width: 280,
    height: 350,
    borderRadius: 140,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  temperatureText: {
    marginTop: 20,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  stopButton: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ShowTemp;
