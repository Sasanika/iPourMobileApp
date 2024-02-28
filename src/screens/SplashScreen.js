import React from 'react'
import { View, Image, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = () => {
    return (
        <LinearGradient
            colors={['#0077c0', '#abd8ea']}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
                <Image style={{ width: 120, height: 100 ,position:'relative', top:'10%'}} source={require('../images/iPourLogo.png')} />
                <Image source={require('../images/teaCups.png')} style={{ width: '80%', height: '30%', justifyContent: 'center', alignItems: 'center',position:'relative', bottom:-200 }}/>

        </LinearGradient>
    )
}

export default SplashScreen
