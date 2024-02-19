import { useNavigation } from "@react-navigation/native";
import { Text, Button, View, StyleSheet, TextInput, TouchableOpacity, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { ref, set, onValue, remove, update } from "firebase/database";
import { db } from '../components/config.jsx';
import AsyncStorage from '@react-native-async-storage/async-storage';


const crud = () => {
    const navigation = useNavigation();

    const logOut = async () => {
      try {
          // Remove stored credentials
          await AsyncStorage.removeItem('username');
          await AsyncStorage.removeItem('password');

          // Navigate to the login screen
          navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      } catch (error) {
          console.error('Error during log out:', error.message);
          // Handle the error appropriately
      }
  };

    const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');

  
  function create (){
    set(ref(db, 'users/' + username), {
      username: username,
      email: email
    }).then(()=>{
      alert('data submitted successfully');
    })
      .catch((error)=>{
        alert(error);
      });
  }

  function updateData (){
    update(ref(db, 'users/' + username), {
      username: username,
      email: email
    }).then(()=>{
      alert('data updated successfully');
    })
      .catch((error)=>{
        alert(error);
      });
  }

  function readData (){
    const starCountRef = ref(db, 'users/' + username);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      setEmail(data.email);
});
  }

  function deleteData (){
    remove(ref(db, 'users/' + username));
    alert('Removed');
  }

  const handleFocusName = () => {
    setUsername('');
  };

  const handleFocusEmail = () => {
    setUsername('');
  };

    return (
    <View style={styles.container}>


        <Text>AllFunctions</Text>

        <Button
                title="Log out"
                onPress={logOut}
                style={styles.logoutButton}
            />

        <TextInput value={username} onChangeText={(username) => {setUsername(username)}} placeholder="Username" placeholderTextColor="#3498db" style={styles.textBoxes}></TextInput> 
      <TextInput value={email} onChangeText={(email) => {setEmail(email)}} placeholder="Email" placeholderTextColor="#3498db" style={styles.textBoxes}></TextInput>

      <TouchableOpacity style={styles.button} onPress={create}>
        <Text style={styles.buttonText}>Add Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={updateData}>
        <Text style={styles.buttonText}>Update Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={readData}>
        <Text style={styles.buttonText}>Get Data</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={deleteData}>
        <Text style={styles.buttonText}>Delete Data</Text>
      </TouchableOpacity>

        

        <StatusBar style="auto" />
    </View>

    );
}

export default crud;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  
    textBoxes:{
      width: 200,
      fontSize: 20,
      padding:12,
      borderColor:'#3498db',
      borderWidth:2,
      borderRadius: 10,
      margin:8,
      
  
    },
    button: {
      backgroundColor: '#3498db', // Button background color
      borderRadius: 10, // Border radius
      paddingVertical: 10,
      paddingHorizontal: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 5, 
      margin:12,
      width:200,// Android shadow
    },
    buttonText: {
      color: '#fff', // Text color
      fontSize: 16,
      textAlign: 'center',
    },
  });
  
