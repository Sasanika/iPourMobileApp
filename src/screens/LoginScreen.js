import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue } from "firebase/database";
import { db } from '../components/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [authenticationError, setAuthenticationError] = useState('');

    useEffect(() => {
        checkLoginStatus();
    }, []);

    const signIn = async () => {
        try {
            // Check if the username and password are not empty
            if (!username || !password) {
                setAuthenticationError('Please enter both username and password');
                return;
            }

            const userRef = ref(db, 'users/' + username);

            // Use the onValue function
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();

                if (data && data.password === password) {
                    // Save the user credentials in AsyncStorage
                    storeCredentials(username, password);

                    // User authenticated successfully, navigate to Home.js
                    navigation.reset({ index: 0, routes: [{ name: 'Home' }] });

                    // Clear input fields
                    setUsername('');
                    setPassword('');
                } else {
                    setAuthenticationError('Invalid username or password');
                }
            });
        } catch (error) {
            console.error('Error during sign-in:', error.message);
            setAuthenticationError('Error during sign-in');
        }
    };

    const storeCredentials = async (username, password) => {
        try {
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('password', password);
        } catch (error) {
            console.error('Error storing credentials:', error);
        }
    };

    const checkLoginStatus = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem('username');
            const storedPassword = await AsyncStorage.getItem('password');
    
            if (storedUsername && storedPassword) {
                // User is already logged in, navigate to Home.js
                navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
            }
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    function turnLogin() {
        navigation.navigate('OnBoarding');
    }

    return (
        <View style={styles.container}>
<Image style={{width:130, height:110, position:'relative', top:170, left:220}} source={require('../images/iPourLogo.png')} />
<Image style={{width:250, height:250, position:'relative', top:-20, left:40}} source={require('../images/SmartKettle.png')} />


            <View style={{height:'60%',width:'100%', backgroundColor:'white',alignItems: 'center',
        justifyContent: 'center',position:'absolute', top:350, borderRadius:40}}>
            
            {authenticationError ? <Text style={styles.errorText}>{authenticationError}</Text> : null}

            <Text style={{fontSize:20, position:'relative',top:-40, fontWeight:'500', color: '#50B8E7'}}>Sign In</Text>

            <TextInput
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholder="Username"
                placeholderTextColor="#50B8E7"
                style={styles.textBoxes}
            />

            <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                placeholder="Password"
                placeholderTextColor="#50B8E7"
                secureTextEntry={true}
                style={styles.textBoxes}
            />

            <TouchableOpacity style={styles.button} onPress={signIn}>
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            <Text>New User? 
                <TouchableOpacity onPress={turnLogin}>
                    <Text style={styles.signupText}>Sign up</Text>
                </TouchableOpacity>
            </Text>

            <StatusBar style="auto" />
            </View>
        </View>
    );
};

export default LoginScreen;

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
    signupText: {
        padding: 0,
        top: 3,
        left: 4,
        position: 'relative',
        color: '#50B8E7',
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginBottom: -20,
    }
});
