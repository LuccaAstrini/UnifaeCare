import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import ResetPasswordScreen from './src/screens/resetPasswordScreen';
import RecuperarSenha from './src/screens/recoverPasswordScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/loginScreens';
import { useFonts,
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
} from '@expo-google-fonts/nunito';
import StackNavigator from './src/routes/Route';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); 

export default function App() {
  const [fontsLoaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    StackNavigator()
  );
}