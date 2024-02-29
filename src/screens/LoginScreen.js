import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ref, onValue } from "firebase/database";
import { db } from '../components/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

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
                    navigation.reset({ index: 0, routes: [{ name: 'HomePage' }] });

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
                navigation.reset({ index: 0, routes: [{ name: 'HomePage' }] });
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
            
                <LinearGradient
                    colors={['#0077c0', 'white']}
                    style={styles.gradient}
                >
                    <View style={styles.card}>
                        {authenticationError ? <Text style={styles.errorText}>{authenticationError}</Text> : null}

                        <Text style={styles.title}>Welcome Back !</Text>

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

                        <TouchableOpacity style={styles.button} onPress={signIn}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>

                        <Text style={{color:'white'}}>New User? 
                            <TouchableOpacity onPress={turnLogin}>
                                <Text style={styles.signupText}>Sign up</Text>
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
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    card: {
        backgroundColor: 'transparent',
        padding: 20,
        borderRadius: 10,
        width: '90%',
        alignItems: 'center',
        borderColor:'white',
        borderWidth: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: '500',
        color: 'white',
        marginBottom: 20,
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
        fontWeight: 'bold',
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
        color: 'white',
        marginBottom: 20,
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
        bottom: 100,
        right: 30,
        width: 110,
        height: 110,
    },
    bottomRightImage2: {
        position: 'absolute',
        bottom: 200,
        right: 10,
        width: 60,
        height: 60,
    },
    bottomRightImage3: {
        position: 'absolute',
        bottom: 180,
        right: 80,
        width: 50,
        height: 50,
    },
});
