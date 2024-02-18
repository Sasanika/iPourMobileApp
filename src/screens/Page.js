import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { Text, Button, View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native"; // Import Alert from react-native
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDatabase, ref, push, set, update } from 'firebase/database'; // Import Firebase database functions
import LottieView from 'lottie-react-native';
import { db } from '../components/config.jsx';

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
    update(temperatureRef, { inputTemperature: parseInt(temperatureValue) }) // Updated to parse temperature as an integer
        .then(() => {
            Alert.alert('Success', 'Temperature set successfully');
            // setTemperature(''); // This line seems unnecessary as setTemperature is not defined in the provided code
        })
        .catch((error) => {
            console.error('Error setting temperature: ', error);
            Alert.alert('Error', 'Failed to set temperature');
        });
}

const Page = () => {
    const navigation = useNavigation();


    return (
        
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                
                
                <Image style={{width:130, height:110, position:'relative', right:0, margin:12,}} source={require('../images/premiumm.gif')} />
                <TouchableOpacity style={{backgroundColor:'purple', padding:12,margin:5, width:'80%', borderRadius:15}}>
                   <Text style={{color:'white', textAlign:'center', fontSize:20, fontWeight:'bold'}}>Upgrade</Text> 
                </TouchableOpacity>
                <Text style={styles.topic0}>Unlock Premium Features with iPour Plus.  
                
                </Text>
                <Text style={{padding:5}}>Unlock a new level of precision and customization with iPour Plus, the premium upgrade for the iPour Mobile App. 
                    Now, not only can you control the temperature of your water, but you can tailor it precisely to match your preferred
                     beverages with unparalleled accuracy.
                     <TouchableOpacity>
                    <Text style={{padding: 0,
        top: 0,
        margin: 0,
        position: 'relative',
        color: 'purple',
        fontWeight: 'bold',}}>Learn more</Text>
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
                        onPress={() => addDrinkTemperature('White Tea', 79.4)}
                    />

                    <Card
                        imageSource={require('../images/matcha.jpg')}
                        title="Matcha"
                        onPress={() =>addDrinkTemperature('Matcha', 75)}
                    />
                </View>

                <View style={styles.row}>
                    <Card
                        imageSource={require('../images/chai_tea.jpg')}
                        title="Chai"
                        onPress={() => addDrinkTemperature('Chai', 100)}
                    />

                    <Card
                        imageSource={require('../images/black_tea.jpg')}
                        title="Black Tea"
                        onPress={() => addDrinkTemperature('Black Tea', 97)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor:'white',
        width: '100%',
        height:'80%',
        
    },
    scrollView: {
        flex: 1,
        backgroundColor:'white',
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
        backgroundColor: '#DCF0FA',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
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
