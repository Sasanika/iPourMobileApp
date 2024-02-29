import React from 'react';
import { View, Image, ImageBackground, StyleSheet } from 'react-native';

const SplashScreen = () => {
    return (
        <ImageBackground 
            source={require('../images/pxfuel.jpg')}
            style={styles.container}
        >
            <View style={styles.logoContainer}>
                <Image 
                    style={styles.logo}
                    source={require('../images/iPourLogo.png')} 
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoContainer: {
        position: 'absolute',
        top: '40%',
        alignItems: 'center'
    },
    logo: {
        width: 120,
        height: 100
    }
});

export default SplashScreen;
