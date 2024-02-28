import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeNavigation from './HomeNavigation'
import LoginScreen from '../screens/LoginScreen'
import OnBoarding from '../screens/OnBoarding'
import Form from '../screens/Form'
import LearnMorePage from '../screens/LearnMorePage'
import HomePage from '../screens/HomePage'
import Page from '../screens/Page'

const AppNavigation = ({ initialRoute }) => {
    const Stack = createNativeStackNavigator()

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="OnBoarding" component={OnBoarding} options={{ headerShown: false }}/>
                <Stack.Screen name="Form" component={Form} options={{ headerShown: false }}/>
                <Stack.Screen name="LearnMorePage" component={LearnMorePage} options={{ headerShown: false }}/>
                <Stack.Screen name="Home" component={HomeNavigation} options={{ headerShown: false }}/>
                <Stack.Screen name="HomePage" component={HomePage} options={{ headerShown: false }} />
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation
