import React from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons,MaterialCommunityIcons,FontAwesome5,FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';




const HomePage = () => {
    const navigation = useNavigation();

    function goDashboard(){
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
    }
    return (
        <ImageBackground
            source={require('../images/pxfuel.jpg')} // Replace with your background image path
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={{fontSize:30, padding:10,color:'white', backgroundColor: 'rgba(0, 0, 0, 0.3)',margin:15}}>Effortless Precision in Water Boiling</Text>
                
                <TouchableOpacity onPress={goDashboard}>
            <LinearGradient
                colors={['#0077c0', 'blue']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}>
                <Text style={styles.buttonText}>Let's Go</Text>
            </LinearGradient>
        </TouchableOpacity>
                
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.scrollViewContent}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.card}>
                    <MaterialCommunityIcons name="tea" size={40} color="black" />
            <Text style={styles.cardText2}>Experience hassle-free water boiling with the iPour Smart Kettle</Text>
        </View>

        <View style={styles.card}>
        <MaterialIcons name="av-timer" size={40} color="black" /><Text style={styles.cardText2}>Say goodbye to tedious waiting and hello to effortless precision in your daily routine</Text>
        </View>

        <View style={styles.card}>
        <FontAwesome5 name="temperature-high" size={40} color="black" />
                    <Text style={styles.cardText2}>Set your desired temperature with a simple tap for perfect brews every time</Text>
        </View>  

  <View style={styles.card}>
  <MaterialIcons name="local-drink" size={40} color="black" />
            <Text style={styles.cardText2}>Customize your boiling preferences from delicate teas to hearty oatmeal with ease</Text>
        </View> 

        <View style={styles.card}>
        <FontAwesome name="paint-brush" size={40} color="black" />
            <Text style={styles.cardText2}>Enjoy the sleek design and ergonomic handle for easy pouring</Text>
        </View> 



                </ScrollView>
               

            </View>
        </ImageBackground>
    );
};


const Card = ({ content}) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardText2}>{content}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: {
        flex: 1,
        position: 'relative',
        top:'40%',
        justifyContent: 'flex-end', // Align cards at the bottom of the screen
    },
    scrollViewContent: {
        paddingHorizontal: 15,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 15,
        elevation: 5,
        margin:10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'transparent',
    },
    card: {
        height: 150,
        width: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    cardText1: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 8
    },
    cardText2: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        padding: 10
    },
});

export default HomePage;
