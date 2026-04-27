import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ResetPasswordScreen from './src/screens/resetPasswordScreen';
import RecuperarSenha from './src/screens/recoverPasswordScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/loginScreens';

export default function App() {
  return (
    StackNavigator()
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