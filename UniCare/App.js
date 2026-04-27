import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ResetPasswordScreen from './src/screens/resetPasswordScreen';
import RecuperarSenha from './src/screens/recoverPasswordScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/loginScreens';

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginView" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginView" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RecoverPasswordView" component={RecuperarSenha} options={{ headerShown: false }} />
          <Stack.Screen name="ResetPasswordView" component={ResetPasswordScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});