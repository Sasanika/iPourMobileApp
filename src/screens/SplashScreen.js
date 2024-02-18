import React from 'react'
import { View, Image } from 'react-native'

const SplashScreen = () => {
    return (
        <View
            style={{ backgroundColor: 'white', flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Image style={{width:120, height:100}} source={require('../images/iPourLogo.png')} />
        </View>
    )
}

export default SplashScreen
