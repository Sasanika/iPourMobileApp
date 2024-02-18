import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { ref, onValue, off } from "firebase/database";
import { db } from '../components/config.jsx';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';

const ShowTemp = () => {
  const [data, setData] = useState(null);
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    // Set up Firebase Realtime Database reference
    const dataRef = ref(db, '/users/kettle/currentTemperature');

    // Subscribe to changes in the data
    const unsubscribe = onValue(dataRef, (snapshot) => {
      const newData = snapshot.val();
      setData(newData);
      checkTemperatureEquality(newData);
    });

    // Unsubscribe from the data when the component unmounts
    return () => {
      off(dataRef, 'value', unsubscribe);
    };
  }, []);

  const ringtoneUri = Asset.fromModule(require('../images/ringtone.mp3')).uri;

  const checkTemperatureEquality = (newData) => {
    if (newData && newData.inputTemperature <= newData.currentTemperature && !alertShown) {
      playRingtone();
      showAlert();
      setAlertShown(true);
    }
  };

  const playRingtone = async () => {
    const soundObject = new Audio.Sound();

    try {
      await soundObject.loadAsync({ uri: ringtoneUri });
      await soundObject.playAsync();
    } catch (error) {
      console.error('Failed to load the sound', error);
    }
  };

  const showAlert = () => {
    Alert.alert(
      'Temperature Equality Alert',
      'The input temperature is equal to or greater than the current temperature!',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') }
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      

      <View style={styles.circle}>
      <Text style={styles.text}>{data} °C</Text>
      
      </View>
      <Text style={{padding:20, color:'#50B8E7', fontWeight:'bold', fontSize:15, position:'relative', top:100}}>Current Temperature of the kettle</Text>


      <Image
        source={require('../images/water.jpg')} // Replace './your-gif-file.gif' with the path to your GIF file
        style={{ width: "100%", height: 300, position:'relative', top:130 }} // Adjust the width and height as needed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'white',
  },
  text: {
    fontSize: 55,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'relative',
    top:100,
    color:'white',
  },
  circle: {
    width: 280,  // Adjust width as needed
    height: 280, // Adjust height as needed
    borderRadius: 140, // Half of the width and height to make it a full circle
    backgroundColor: '#50B8E7', 
    position:'relative',
     top:100// Example background color
  },
});

export default ShowTemp;
