import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Page from '../screens/Page'
import AllFunctions from "../screens/AllFunctions";
import ShowTemp from "../screens/ShowTemp";
import EnterTemp from "../screens/EnterTemp";
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HomeNavigation = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName='Page1'
            screenOptions={{ headerShown: false }}
        >
            
            <Tab.Screen name='Dashboard' component={Page} 
            options={{
          tabBarIcon: ({ color, size }) => (
                <FontAwesome name="home" size={30} color="#50B8E7" />          ),
        }}/>
            <Tab.Screen name='Get Started'
             component={EnterTemp}
             options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome5 name="temperature-high" size={30} color="#50B8E7" />         ),
              }}/>


            <Tab.Screen name='Current Status' component={ShowTemp} 
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="kettle-pour-over" size={30} color="#50B8E7" />        ),
              }}/>
            <Tab.Screen name='Settings' component={AllFunctions}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="settings" size={30} color="#50B8E7" />         ),
              }}/>
            
            
        </Tab.Navigator>
    )
}

export default HomeNavigation
