import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ExerciseScreen from '../screens/exerciseScreen';
import FeedbackScreen from '../screens/feedbackScreen';
import LoginScreen from '../screens/loginScreens';
import RecuperarSenha from '../screens/recoverPasswordScreen';
import ResetPasswordScreen from '../screens/resetPasswordScreen';
import DrawerNavigator from '../screens/TabNavigator';
import { navigationRef } from '../services/navigationRef';

const Stack = createStackNavigator();

export default function StackNavigator() {
    return (
        <SafeAreaProvider>
            <NavigationContainer ref={navigationRef}>
                <Stack.Navigator initialRouteName="LoginView" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Tab" component={DrawerNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="FeedbackView" component={FeedbackScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="LoginView" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="RecoverPasswordView" component={RecuperarSenha} options={{ headerShown: false }} />
                    <Stack.Screen name="ResetPasswordView" component={ResetPasswordScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="exercise" component={ExerciseScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}