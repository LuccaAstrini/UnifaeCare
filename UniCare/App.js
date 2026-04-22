import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ResetPasswordScreen from './src/screens/resetPasswordScreen';

export default function App() {
  
  
  return (
    ResetPasswordScreen()
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