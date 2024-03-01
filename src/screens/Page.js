import React from 'react';
import { useNavigation } from "@react-navigation/native";
import { Text, Linking, View, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from "react-native"; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { ref, update } from 'firebase/database'; 
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
            Alert.alert('Success', 'Your refreshing beverage is just moments away! Now turn on the kettle.');
        })
        .catch((error) => {
            console.error('Error setting temperature: ', error);
            Alert.alert('Error', 'Failed to set temperature');
        });
}

const Page = () => {

    function GoForm(){
        Linking.openURL('https://forms.gle/yWD4Sjc6RXoPmo9YA');
    }

    function LearnMore(){
        Linking.openURL('https://forms.gle/yWD4Sjc6RXoPmo9YA');
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
                    <Image source={require('../images/waterDrop.png')} style={styles.topLeftImage1} />
            <Image source={require('../images/waterDrop.png')} style={styles.topLeftImage2} />
            <Image source={require('../images/waterDrop.png')} style={styles.topLeftImage3} />
            <Image source={require('../images/waterDrop.png')} style={styles.topLeftImage4} />
            {/* Bottom right images */}
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage1} />
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage2} />
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage3} />
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage4} />
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage5} />
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage6} />
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage7} />

                </ScrollView>
            </SafeAreaView>
            
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    topLeftImage1: {
        position: 'absolute',
        top: 150,
        left: 100,
        width: 60,
        height: 60,
    },
    topLeftImage2: {
        position: 'absolute',
        top: 10,
        left: 250,
        width: 40,
        height: 40,
    },
    topLeftImage4: {
        position: 'absolute',
        top: 10,
        left: 150,
        width: 100,
        height: 100,
    },
    topLeftImage3: {
        position: 'absolute',
        top: 20,
        left: 20,
        width: 50,
        height: 50,
    },
    bottomRightImage1: {
        position: 'absolute',
        bottom: 250,
        right: 100,
        width: 100,
        height: 100,
    },
    bottomRightImage2: {
        position: 'absolute',
        bottom: 200,
        right: 150,
        width: 60,
        height: 60,
    },
    bottomRightImage3: {
        position: 'absolute',
        bottom: 480,
        right: 180,
        width: 70,
        height: 70,
    },
    bottomRightImage4: {
        position: 'absolute',
        bottom: 550,
        right: 200,
        width: 50,
        height: 50,
    },
    bottomRightImage7: {
        position: 'absolute',
        bottom: 1300,
        right: 20,
        width: 80,
        height: 80,
    },
    bottomRightImage5: {
        position: 'absolute',
        bottom: 1100,
        right: 10,
        width: 100,
        height: 100,
    },
    bottomRightImage6: {
        position: 'absolute',
        bottom: 1200,
        right: 0,
        width: 50,
        height: 50,
    },
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
        color:'white',
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
        color:'white',
    },
    card: {
        width: '45%', 
        backgroundColor: 'transparent', 
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor:'white',
         // Android only
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
        color: 'white',
    },
   
});

export default Page;
