import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { set, ref, get } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../components/config';

const OnBoarding = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  function turnLogin(){
    navigation.navigate('Login');
  }

  async function signUp() {
    try {
      const userRef = ref(db, 'users/' + username);
      
      // Check if the username already exists in the database
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        throw new Error('Username already exists');
      }
  
      // Save user credentials in the database
      await set(userRef, { password });
  
      // Save the user credentials in AsyncStorage
      await AsyncStorage.setItem('username', username);
      await AsyncStorage.setItem('password', password);
  
      // User registered successfully, navigate to SignIn.js
      navigation.navigate('Login');
    } catch (error) {
      alert('Error creating account: ' + error.message);
    }
  }
  
    return (
      
        <View style={styles.container}>

          <Text style={{ textAlign:'center', position:'relative', top:150, color:'white', fontWeight:'bold',fontSize:20, padding:30}}>Join the iPour community and discover a new world of brewing possibilities. </Text>
          <View style={{height:'60%',width:'100%', backgroundColor:'white',alignItems: 'center',
        justifyContent: 'center',position:'absolute', top:350, borderRadius:40}}>
            <Text style={{fontSize:20, position:'relative',top:-40, fontWeight:'500', color: '#50B8E7'}}>Sign Up</Text>
    
          <TextInput 
            value={username} 
            onChangeText={(text) => setUsername(text)} 
            placeholder="Username" 
            placeholderTextColor="#3498db" 
            style={styles.textBoxes}
          />
    
          <TextInput 
            value={password} 
            onChangeText={(text) => setPassword(text)} 
            placeholder="Password" 
            placeholderTextColor="#3498db" 
            secureTextEntry={true} 
            style={styles.textBoxes}
          />
    
          <TouchableOpacity style={styles.button} onPress={signUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text>Already have an account? 
            <TouchableOpacity onPress={turnLogin}>
              <Text style={{padding:0, top:3,left:4, position: 'relative', color:'#50B8E7', fontWeight:'bold'}}>Sign In</Text>
              </TouchableOpacity>
              </Text>
    
          <StatusBar style="auto" />
          </View>
        </View>
      );
}

export default OnBoarding;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#50B8E7',

    },
    textBoxes: {
      width: '90%',
      fontSize: 20,
      padding: 15,        
      borderRadius: 10,
      margin: 15,
      backgroundColor: '#DCF0FA',
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
      margin: 12,
      width: '90%',
  },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
    },
  });
