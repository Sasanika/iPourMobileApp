import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 
import Page from '../screens/Page';
import AllFunctions from '../screens/AllFunctions';
import ShowTemp from '../screens/ShowTemp';
import EnterTemp from '../screens/EnterTemp';

const HomeNavigation = () => {
    const Tab = createBottomTabNavigator();
    return (
        <View style={{ flex: 1 }}>
            <Tab.Navigator
                initialRouteName='Drinks'
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: 'rgba(23,143,215, 0.5)', 
                        borderTopWidth: 0, 
                        position: 'absolute', 
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: 60, 
                        elevation: 0, 
                    },
                    tabBarIcon: ({ focused }) => {
                        let iconName;

                        if (route.name === 'Drinks') {
                            return <MaterialIcons name="emoji-food-beverage" size={30} color={focused ? 'white' : 'black'} />;
                        }else if (route.name === 'Get Started') {
                            return <FontAwesome5 name="temperature-high" size={30} color={focused ? 'white' : 'black'} />;
                        } else if (route.name === 'Current Status') {
                            return <MaterialCommunityIcons name="kettle-steam" size={30} color={focused ? 'white' : 'black'} />;
                        } else if (route.name === 'Settings') {
                            return <AntDesign name="setting" size={30} color={focused ? 'white' : 'black'} />;
                        }
                        return null;
                    },
                    tabBarLabel: () => null
                })}
            >
                

                <Tab.Screen
                    name='Drinks'
                    component={Page}
                />

                <Tab.Screen
                    name='Get Started'
                    component={EnterTemp}
                />
                <Tab.Screen
                    name='Current Status'
                    component={ShowTemp}
                />
                <Tab.Screen
                    name='Settings'
                    component={AllFunctions}
                />
            </Tab.Navigator>
        </View>
    );
};

export default HomeNavigation;
