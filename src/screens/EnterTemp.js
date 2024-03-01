import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Switch, Alert, Image } from 'react-native';
import { ref, update, onValue, get } from 'firebase/database';
import { db } from '../components/config.jsx';
import { LinearGradient } from 'expo-linear-gradient';



export default function EnterTemp() {

  const [kettleStatus, setKettleStatus] = useState(false); // Assuming kettle starts as off
  const [keepWarm, setKeepWarm] = useState(false); 

  useEffect(() => {
    const keepWarmRef = ref(db, '/users/kettle/kettleAppWarm');
    onValue(keepWarmRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setKeepWarm(data);
      }
    });
  }, []);
  
  const handleToggleWarm = async () => {
    try {

      const kettleAppOnRef = ref(db, '/users/kettle/kettleAppOn');
    const snapshotKettleAppOn = await get(kettleAppOnRef);
    const kettleAppOnStatus = snapshotKettleAppOn.val();

    // If kettleAppOn is false, show an error message and return
    if (!kettleAppOnStatus) {
      Alert.alert('Error', 'Please turn on the kettle first');
      return;
    }
      const keepWarmRef = ref(db, '/users/kettle/kettleAppWarm');
      const snapshotWarm = await get(keepWarmRef);
      const keepWarmStatus = snapshotWarm.val();
  
      // Toggle keepWarm based on its current value
      const newKeepWarmStatus = !keepWarmStatus;
  
      // Update Firebase with the new keepWarm status
      await update(ref(db, '/users/kettle'), { kettleAppWarm: newKeepWarmStatus });
    } catch (error) {
      console.error('Error updating keepWarm status:', error);
      // Handle error as per your app's requirements
    }
  };
  

  useEffect(() => {
    const kettleOnRef = ref(db, '/users/kettle/kettleAppOn');
    onValue(kettleOnRef, (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        setKettleStatus(data);
      }
    });
  }, []);
  
  const handleToggle = async () => {
    try {
      const kettleOnRef = ref(db, '/users/kettle/kettleAppOn');
      const snapshot = await get(kettleOnRef);
      const kettleOnStatus = snapshot.val();
  
      // Toggle kettleAppOn based on the current value of kettleOn
      const newKettleAppOnStatus = !kettleOnStatus;
  
      // Update Firebase with the new kettleAppOn status
      await update(ref(db, '/users/kettle'), { kettleAppOn: newKettleAppOnStatus });
    } catch (error) {
      console.error('Error updating kettle status:', error);
      // Handle error as per app's requirements
    }
  };
  
  
  
  
  
  
  
  const [temperature, setTemperature] = useState('');

  const handleSetTemperature = () => {
    const parsedTemperature = parseInt(temperature);
  
    // Check if the entered temperature is a valid number
    if (isNaN(parsedTemperature)) {
      Alert.alert('Error', 'Please enter a valid temperature');
      return;
    }
  
    // Check if the entered temperature is within the range of 40 to 100
    if (parsedTemperature < 40 || parsedTemperature > 100) {
      Alert.alert('Error', 'Please enter a temperature between 40°C and 100°C.');
      return;
    }
  
    const temperatureRef = ref(db, '/users/kettle');
    update(temperatureRef, { kettleAppInputTemp: parsedTemperature })
      .then(() => {
        Alert.alert('Success', 'Your water will reach the perfect temperature tailored to your preference.');
        setTemperature('');
      })
      .catch((error) => {
        console.error('Error setting temperature: ', error);
        Alert.alert('Error', 'Failed to set temperature');
      });
  };
  

  return (
    <View style={styles.container}>
      <View style={{flex:1, position: 'relative', width: '100%', height: '50%', top: -200 }}>
  <Image style={{ width: '100%', height: '100%' }} source={require('../images/pxfuel.jpg')} />
  <View style={{ position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -190 }, { translateY: -50 }] }}>
   
  </View>
</View>
<LinearGradient
            colors={['#0077c0', '#abd8ea']}
            style={{height:'80%',width:'100%',alignItems: 'center',
        justifyContent: 'center',position:'absolute', top:200, borderRadius:40}}
        >

      <View style={{height:'80%',width:'100%',alignItems: 'center',
        justifyContent: 'center',position:'absolute',top:20, borderRadius:40}}>





      <TextInput
        style={styles.input}
        placeholder="Enter temperature"
        placeholderTextColor="white"
        keyboardType="numeric"
        value={temperature}
        onChangeText={(text) => setTemperature(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSetTemperature}>
        <Text style={styles.buttonText}>Set</Text>
      </TouchableOpacity>
      <View style={{ 
        flexDirection: 'row',
        backgroundColor: 'transparent',
        borderColor: 'white', // Transparent white border
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 10,
        borderWidth:1,
        width: '90%',
        margin:10
      }}>
  <Text style={{ flex: 1, fontWeight: 'bold', color: 'white', paddingHorizontal: 20,paddingVertical:30, fontSize:20 }}>On/Off</Text>
  <Image
    source={require('../images/kettleOnOff.gif')}
    style={{ width: 100, height: 100., marginRight: 20  }}
  />
  <Switch
    value={kettleStatus}
    thumbColor={kettleStatus ? '#0077c0' : 'white'}
    onValueChange={handleToggle}
    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],marginHorizontal:10 }}
  />
</View>


<View style={{
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderColor: 'white', 
    paddingLeft: 12,
    paddingRight: 12,
    borderRadius: 10,
    borderWidth:1,
    width: '90%'
}}>
  <Text style={{ flex: 1,  paddingHorizontal: 20,paddingVertical:30, fontWeight: 'bold', color: 'white', fontSize:20 }}>Hot Mode</Text>
  <Image
    source={require('../images/hotMode.gif')}
    style={{ width: 100, height: 100, marginRight: 20  }}
  />
  <Switch
    value={keepWarm}
    thumbColor={keepWarm ? '#0077c0' : 'white'}
    onValueChange={handleToggleWarm}
    style={{ transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }] , marginHorizontal:10}}
  />
</View>

      </View>
      <Image source={require('../images/waterDrop.png')} style={styles.topLeftImage1} />
            <Image source={require('../images/waterDrop.png')} style={styles.topLeftImage2} />

            {/* Bottom right images */}
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage1} />
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage2} />
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage3} />

      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  topLeftImage1: {
    position: 'absolute',
    top: 50,
    left: 100,
    width: 60,
    height: 60,
},
topLeftImage2: {
    position: 'absolute',
    top: 10,
    left: 20,
    width: 100,
    height: 100,
},
bottomRightImage1: {
    position: 'absolute',
    bottom: 100,
    right: 30,
    width: 110,
    height: 110,
},
bottomRightImage2: {
    position: 'absolute',
    bottom: 90,
    right: 180,
    width: 60,
    height: 60,
},
bottomRightImage3: {
    position: 'absolute',
    bottom: 140,
    right: 150,
    width: 50,
    height: 50,
},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  input: {
    width: '90%',
color:'white',
        fontSize: 20,
        padding: 15,        
        borderRadius: 10,
        margin: 5,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 1,
  },
  button: {
    backgroundColor: '#50B8E7',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        marginTop: 15,
        marginBottom: 20,
        width: '90%',

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
