import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { set, ref, get } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../components/config';
import { LinearGradient } from 'expo-linear-gradient';

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
            <LinearGradient
                colors={['#0077c0', 'white']}
                style={styles.gradient}
            >
                <View style={styles.card}>
                    <Text style={styles.title}>Join the iPour community and discover a new world of brewing possibilities.</Text>
                    <TextInput 
                        value={username} 
                        onChangeText={(text) => setUsername(text)} 
                        placeholder="Username" 
                        placeholderTextColor="white" 
                        style={styles.textBoxes}
                    />
                    <TextInput 
                        value={password} 
                        onChangeText={(text) => setPassword(text)} 
                        placeholder="Password" 
                        placeholderTextColor="white" 
                        secureTextEntry={true} 
                        style={styles.textBoxes}
                    />
                    <TouchableOpacity style={styles.button} onPress={signUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style={styles.loginText}>Already have an account? 
                        <TouchableOpacity onPress={turnLogin}>
                            <Text style={styles.signupText}>Sign In</Text>
                        </TouchableOpacity>
                    </Text>
                </View>
            </LinearGradient>

            {/* Top left images */}
            <Image source={require('../images/waterDrop.png')} style={styles.topLeftImage1} />
            <Image source={require('../images/waterDrop.png')} style={styles.topLeftImage2} />

            {/* Bottom right images */}
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage1} />
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage2} />
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage3} />

            <StatusBar style="auto" />
        </View>
    );
}

export default OnBoarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        backgroundColor: 'transparent',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        borderColor:'white',
        borderWidth: 1,
        marginTop: '10%',
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 20,
    },
    textBoxes: {
      width: '90%',
      fontSize: 20,
      padding: 15,
      borderRadius: 10,
      margin: 15,
      backgroundColor: 'transparent',
      borderColor:'white',
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
        margin: 12,
        width: '90%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    loginText: {
        color: 'white',
        marginTop: 10,
    },
    signupText: {
        padding: 0,
        top: 3,
        left: 4,
        position: 'relative',
        color: '#50B8E7',
        fontWeight: 'bold',
        
    },
    gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    topLeftImage1: {
        position: 'absolute',
        top: 150,
        left: 100,
        width: 60,
        height: 60,
    },
    topLeftImage2: {
        position: 'absolute',
        top: 80,
        left: 20,
        width: 100,
        height: 100,
    },
    bottomRightImage1: {
        position: 'absolute',
        bottom: 70,
        right: 150,
        width: 110,
        height: 110,
    },
    bottomRightImage2: {
        position: 'absolute',
        bottom: 200,
        right: 100,
        width: 60,
        height: 60,
    },
    bottomRightImage3: {
        position: 'absolute',
        bottom: 180,
        right: 300,
        width: 50,
        height: 50,
    },
});
