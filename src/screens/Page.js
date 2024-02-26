import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { Text, Button, View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native"; // Import Alert from react-native
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDatabase, ref, push, set, update } from 'firebase/database'; // Import Firebase database functions
import LottieView from 'lottie-react-native';
import { db } from '../components/config.jsx';
import { LinearGradient } from 'expo-linear-gradient';

const Card = ({ imageSource, title, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image source={imageSource} style={styles.cardImage} />
        <Text style={styles.cardText}>{title}</Text>
    </TouchableOpacity>
);

function addDrinkTemperature(temperatureValue) {
    if (temperatureValue === '') {
        Alert.alert('Error', 'Please enter a temperature');
        return;
    }
    const temperatureRef = ref(db, '/users/kettle');
    update(temperatureRef, { kettleAppInputTemp : parseInt(temperatureValue) }) // Updated to parse temperature as an integer
        .then(() => {
            Alert.alert('Success', 'Your refreshing beverage is just moments away! We are boiling water to your perfection. ');
            // setTemperature(''); // This line seems unnecessary as setTemperature is not defined in the provided code
        })
        .catch((error) => {
            console.error('Error setting temperature: ', error);
            Alert.alert('Error', 'Failed to set temperature');
        });
}

const Page = () => {
    const navigation = useNavigation();

    function GoForm(){
        navigation.reset({ index: 0, routes: [{ name: 'Form' }] });

    }

    function LearnMore(){
        navigation.reset({ index: 0, routes: [{ name: 'LearnMorePage' }] });

    }


    return (
        <LinearGradient
            colors={['#0077c0', '#abd8ea']}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <Image style={{width:130, height:110, position:'relative', right:0, margin:12,}} source={require('../images/premiumm.gif')} />
                    <TouchableOpacity onPress={GoForm}>
            <LinearGradient
                colors={['#AD1DEB', '#6E72FC']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.button}>
                <Text style={styles.buttonText}>Upgrade</Text>
            </LinearGradient>
        </TouchableOpacity>


                    <Text style={styles.topic0}>Unlock Premium Features with iPour Plus.</Text>
                    <Text style={{padding:5, color:'white'}}>Unlock a new level of precision and customization with iPour Plus, the premium upgrade for the iPour Mobile App. Now, not only can you control the temperature of your water, but you can tailor it precisely to match your preferred beverages with unparalleled accuracy.
                        <TouchableOpacity onPress={LearnMore}>
                            <Text style={{padding: 0, top: 0, margin: 0, position: 'relative', color: 'purple', fontWeight: 'bold'}}>Learn more</Text>
                        </TouchableOpacity>
                    </Text>

                    <Text style={styles.topic1}>Coffee</Text>

                    <View style={styles.row}>
                        <Card
                            imageSource={require('../images/drip_coffee.jpg')}
                            title="Drip Coffee"
                            onPress={() => addDrinkTemperature( 93.3)}
                        />

                        <Card
                            imageSource={require('../images/espresso.jpg')}
                            title="Espresso"
                            onPress={() => addDrinkTemperature(90.6)}
                        />
                    </View>

                    <Card
                        imageSource={require('../images/french_press.jpg')}
                        title="Frenchpress"
                        onPress={() => addDrinkTemperature(93.3)}
                    />

                    <Text style={styles.topic1}>Tea</Text>

                    <View style={styles.row}>
                        <Card
                            imageSource={require('../images/green_tea.jpg')}
                            title="Green Tea"
                            onPress={() => addDrinkTemperature(82 )}
                        />

                        <Card
                            imageSource={require('../images/herbal_tea.jpg')}
                            title="Herbal Tea"
                            onPress={() => addDrinkTemperature(100)}
                        />
                    </View>

                    <View style={styles.row}>
                        <Card
                            imageSource={require('../images/infusion_tea.jpg')}
                            title="Infussion Tea(Fruits, Herbs)"
                            onPress={() => addDrinkTemperature(100)}
                        />

                        <Card
                            imageSource={require('../images/oolong_tea.jpg')}
                            title="Oolong Tea"
                            onPress={() => addDrinkTemperature(90.6)}
                        />
                    </View>

                    <View style={styles.row}>
                        <Card
                            imageSource={require('../images/white_tea.jpg')}
                            title="White Tea"
                            onPress={() => addDrinkTemperature(79.4)}
                        />

                        <Card
                            imageSource={require('../images/matcha.jpg')}
                            title="Matcha"
                            onPress={() =>addDrinkTemperature(75)}
                        />
                    </View>

                    <View style={styles.row}>
                        <Card
                            imageSource={require('../images/chai_tea.jpg')}
                            title="Chai"
                            onPress={() => addDrinkTemperature(100)}
                        />

                        <Card
                            imageSource={require('../images/black_tea.jpg')}
                            title="Black Tea"
                            onPress={() => addDrinkTemperature(97)}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        width: '100%',
        height:'100%',
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 30,
    },
    topic0:{
        fontSize: 20,
        fontWeight: '500',
        color:'#50B8E7',
        width: '90%',
        position: 'relative',
        top: 0,
        padding:5,
    },
    topic1:{
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        marginTop: 20,
    },
    card: {
        width: '45%', // Adjust as needed to create two columns
        backgroundColor: 'rgba(255, 255, 255, 0.6)', // Transparent white background
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)', // Transparent white border
        shadowColor: 'rgba(0, 0, 0, 0.3)', // Semi-transparent black shadow
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5, // Semi-transparent shadow
        shadowRadius: 3, // Spread of the shadow
        elevation: 5, // Android only
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 15,
        elevation: 5,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        backgroundColor: 'transparent',
    },
    cardImage: {
        width: '100%',
        height: 180, // Adjust the height as needed
        borderRadius: 5,
        marginBottom: 10,
    },
    cardText: {
        fontSize: 16,
        fontWeight: '300',
        marginBottom: 10,
    },
   
});

export default Page;
