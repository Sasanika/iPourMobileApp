import { useNavigation } from "@react-navigation/native";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Linking, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";


const AllFunctions = () => {
    const navigation = useNavigation();

    const logOut = async () => {
        try {
            // Remove stored credentials
            await AsyncStorage.removeItem('username');
            await AsyncStorage.removeItem('password');

            // Navigate to the login screen
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
        } catch (error) {
            console.error('Error during log out:', error.message);
            // Handle the error appropriately
        }
    };

    const openWebsite = () => {
        Linking.openURL('https://example.com');
    };

    const sendEmail = () => {
        Linking.openURL('mailto:iPour4321@gmail.com');
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0077c0','#5abcd8' ,'#2389da']}
                style={styles.gradient}
            >
            
            <ScrollView style={styles.menuList}>
            
                {/* Go to Website */}
                <TouchableOpacity onPress={openWebsite} style={styles.menuItem}>
                    <Text style={styles.menuItemText}>1. Go to Website</Text>
                </TouchableOpacity>
                {/* Email Us */}
                <TouchableOpacity onPress={sendEmail} style={styles.menuItem}>
                    <Text style={styles.menuItemText}>2. Email Us</Text>
                </TouchableOpacity>
                
                <Image source={require('../images/waterDrop.png')} style={styles.topLeftImage1} />
            <Image source={require('../images/waterDrop.png')} style={styles.topLeftImage2} />

            {/* Bottom right images */}
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage1} />
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage2} />
            <Image source={require('../images/waterDrop.png')} style={styles.bottomRightImage3} />       

                
            </ScrollView>
            {/* FAQ Section */}
            <TouchableOpacity
    onPress={logOut}
    style={styles.logoutButton}
>
                <Text style={{color:'white', fontSize:18, borderWidth:1, padding:6, borderColor:'white', borderRadius:8}}><MaterialCommunityIcons name="logout" size={24} color="white" /> Logout</Text>
            </TouchableOpacity>
            <View style={styles.faqContainer}>
              
                <Text style={styles.faqTitle}>FAQ</Text>
                <ScrollView>
                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>Q: What is the iPour Smart Kettle?</Text>
                        <Text style={styles.answers}>A: The iPour Smart Kettle is a cutting-edge kettle designed to redefine beverage brewing excellence. It combines advanced technology with elegant design to offer the ultimate beverage experience.</Text>
                    </View>
                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>Q: What makes the iPour Smart Kettle unique?</Text>
                        <Text style={styles.answers}>A: The iPour Smart Kettle stands out for its unrivaled brewing precision, innovative features, and sleek design. It allows users to precisely control the temperature and timing of their beverage brewing process, resulting in perfect brews every time.</Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>Q: What beverages can I brew with the iPour Smart Kettle?</Text>
                        <Text style={styles.answers}>A: The iPour Smart Kettle is versatile and can be used to brew a wide range of beverages, including tea, coffee, hot chocolate, and more. Its adjustable temperature settings cater to different brewing requirements.</Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>Q: How does the iPour Smart Kettle work?</Text>
                        <Text style={styles.answers}>A: The iPour Smart Kettle features advanced heating elements and intuitive controls that allow users to select their desired temperature and brewing time. Its precision spout ensures accurate pouring, while its ergonomic handle provides comfort and control.</Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>Q: Is the iPour Smart Kettle easy to clean?</Text>
                        <Text style={styles.answers}>A: Yes, the iPour Smart Kettle is designed for easy cleaning. Its removable lid and wide opening make it simple to access and clean the interior. Additionally, the kettle's stainless steel construction resists stains and buildup, ensuring long-lasting performance.</Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>Q: What safety features does the iPour Smart Kettle have?</Text>
                        <Text style={styles.answers}>A: The iPour Smart Kettle prioritizes safety with features such as automatic shut-off, boil-dry protection, and heat-resistant materials. These safeguards ensure peace of mind during the brewing process.</Text>
                    </View>

                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>Q: Does the iPour Smart Kettle come with a warranty?</Text>
                        <Text style={styles.answers}>A: Yes, the iPour Smart Kettle is backed by a comprehensive warranty that covers manufacturing defects and ensures customer satisfaction. Please refer to the product documentation for warranty details.</Text>
                    </View>
                    
                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>Q: Where can I purchase the iPour Smart Kettle?</Text>
                        <Text style={styles.answers}>A: The iPour Smart Kettle is available for purchase online through our official website and select retail partners. Visit our website or contact our customer service team for more information on purchasing options and availability.</Text>
                    </View>
                    
                    <View style={styles.faqItem}>
                        <Text style={styles.faqQuestion}>Q: How can I get support or assistance with my iPour Smart Kettle?</Text>
                        <Text style={styles.answers}>A: Our dedicated customer support team is available to assist you with any questions, troubleshooting, or technical issues related to your iPour Smart Kettle. Contact us via phone, email, or live chat for prompt and friendly assistance.</Text>
                    </View>  
                     
                        
                </ScrollView>
            </View>
            <StatusBar style="auto" />
            </LinearGradient>
        </View>
    );
}

export default AllFunctions;

const styles = StyleSheet.create({
    topLeftImage1: {
    position: 'absolute',
    top: 0,
    left: 100,
    width: 60,
    height: 60,
},
topLeftImage2: {
    position: 'absolute',
    top: 0,
    left: 20,
    width: 40,
    height: 40,
},
bottomRightImage1: {
    position: 'absolute',
    top: 0,
    right: 150,
    width: 30,
    height: 30,
},
bottomRightImage2: {
    position: 'absolute',
    top: -1,
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    answers:{
        color: 'white',
    },
     gradient: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position:'absolute',
    },
    logoutButton: {
      position: 'absolute',
      top: 30, // Adjust top position as needed
      right: 10, // Adjust right position as needed
      padding: 30,
     
  },
  
    menuList: {
        flex: 1,
        width: '100%',
        paddingTop: 100,
        paddingLeft:20,
        paddingBottom:0,
    },
    menuItem: {
        marginBottom: 10,
    },
    menuItemText: {
        color: 'white',
        fontWeight:'bold',
        fontSize: 16,

    },
    faqContainer: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    faqTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    faqItem: {
        marginBottom: 20,
    },
    faqQuestion: {
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white',
    },
});
