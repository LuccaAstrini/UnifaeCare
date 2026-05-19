import { createStackNavigator } from '@react-navigation/stack';
import RecuperarSenha from '../screens/recoverPasswordScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/loginScreens';
import ResetPasswordScreen from '../screens/resetPasswordScreen';
import TabNavigator from '../screens/TabNavigator';
import ExerciseScreen from '../screens/exerciseScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="LoginView" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="LoginView" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="RecoverPasswordView" component={RecuperarSenha} options={{ headerShown: false }} />
                    <Stack.Screen name="ResetPasswordView" component={ResetPasswordScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="exercise" component={ExerciseScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}