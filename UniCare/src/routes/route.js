import { createStackNavigator } from '@react-navigation/stack';
import ResetPasswordScreen from './src/screens/resetPasswordScreen';
import RecuperarSenha from './src/screens/recoverPasswordScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/loginScreens';
import HomeScreen from '../src/screens/HomeScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="LoginView" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="RecoverPasswordView" component={RecuperarSenha} options={{ headerShown: false }} />
                    <Stack.Screen name="ResetPasswordView" component={ResetPasswordScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}