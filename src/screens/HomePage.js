import React from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView } from 'react-native';

const HomePage = () => {
    return (
        <ImageBackground
            source={require('../images/kitchen.jpg')} // Replace with your background image path
            style={styles.background}
        >
            <View style={styles.container}>
                <ScrollView
                    horizontal
                    contentContainerStyle={styles.scrollViewContent}
                    showsHorizontalScrollIndicator={false}
                >
                    <Card title="Text in Component 1" />
                    <Card title="Text in Component 2" />
                    <Card title="Text in Component 3" />
                    <Card title="Text in Component 3" />
                    <Card title="Text in Component 3" />
                    <Card title="Text in Component 3" />


                    {/* Add more cards as needed */}
                </ScrollView>
            </View>
        </ImageBackground>
    );
};

const Card = ({ title }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardText}>{title}</Text>
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
        top:'80%',
        justifyContent: 'flex-end', // Align cards at the bottom of the screen
    },
    scrollViewContent: {
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    card: {
        height: 100,
        width: 150,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});

export default HomePage;
