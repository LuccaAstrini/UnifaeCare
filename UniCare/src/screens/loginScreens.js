import React, { useState } from 'react';
import ErrorModal from '../../components/modals/ErrorModal';
import LoadingModal from '../../components/modals/LoadingModal';
import {
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Card from '../../components/Card';
import CustomText from '../../components/CustomText';
import { GRAY_1, GREEN_1, GREEN_3, GREEN_4, GREEN_5 } from '../styles/Colors';
import Card from '../../components/cards/Card';
import CustomInput from '../../components/CustomTextInput';
import PositiveButton from '../../components/buttons/PositiveButton';
import ApiService from '../services/api';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function login() {
    try {
      setLoading(true);
      if (email.trim() === '' || password.trim() === '') {
        setErrorMessage('Por favor, preencha todos os campos.');
        return;
      }

      if (!validateEmail(email)) {
        setErrorMessage('Por favor, insira um e-mail válido.');
        return;
      }

      if (password.length < 6) {
        setErrorMessage('A senha deve conter pelo menos 6 caracteres.');
        return;
      }

      const response = await ApiService.login(email, password);
      await SecureStore.setItemAsync('api_token', response.access_token);
      const userInfo = await ApiService.getUserInfo();
      const name = userInfo.profile.name || 'Usuário';
      await AsyncStorage.setItem('user_name', name);
      await ApiService.acceptTerms();
      setLoading(false);
      navigation.navigate('Tab');
    } catch (error) {
      let msg = 'Erro ao realizar login!';
      console.error('Login error:', error);
      console.log('Error status:', error.status);

      if (error.status === 400) {
        msg = 'Email inválido. Por favor, verifique o formato do seu e-mail.';
      }

      if (error.status === 401) {
        msg = 'Credenciais inválidas. Por favor, verifique seu e-mail e senha.';
      }

      setErrorMessage(msg);
    }
  }

  return (
    <SafeAreaView style={{ flex: 2, backgroundColor: GREEN_4 }}>
      <CustomText variant="title" style={{ textAlign: 'center', marginTop: 60, color: GREEN_1, fontSize: 34 }}>
        UNIFAE Care
      </CustomText>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Card>
          <CustomText variant="bodyLarge" style={{ color: GREEN_1 }}>
            Bem-vindo.
          </CustomText>

          <CustomText variant="bodyMedium" style={{ marginBottom: 25 }}>
            Entre com suas credencias para continuar.
          </CustomText>

          <CustomText variant="caption" style={{ marginBottom: 5 }}>
            E-mail
          </CustomText>

          <CustomInput
            value={email}
            onChangeText={setEmail}
            placeholder="Digite sua senha"
            secureTextEntry={false}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10
            }}
          >
            <CustomText variant="caption" style={{ marginBottom: 5 }}>
              Senha
            </CustomText>

            <CustomText variant="caption" style={{ fontWeight: 'bold', marginBottom: 5, color: GREEN_3 }} onPress={() => { navigation.navigate('RecoverPasswordView') }}>
              Recuperar senha
            </CustomText>
          </View>

          <CustomInput
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry={true}
          />

          <PositiveButton onPress={() => { login() }} title='Entrar' enabled={!loading} />

          <View style={{
            alignItems: 'center',
            borderBottomWidth: 3,
            marginTop: 40,
            borderBottomColor: GRAY_1,
            borderRadius: 10,
          }}>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 25,
              justifyContent: 'center'
            }}
          >
            <CustomText variant="label" style={{ marginHorizontal: 5, color: GRAY_1 }} onPress={() => { navigation.navigate('RecoverPasswordView') }}>
              Novo por aqui?
            </CustomText>

            <CustomText variant="label" style={{ color: GREEN_5 }} onPress={() => { }}>
              Registre-se
            </CustomText>
          </View>
        </Card>
      </View>
      <LoadingModal visible={loading} message='Verificando credenciais' />
      <ErrorModal
        visible={!!errorMessage}
        message={errorMessage}
        onClose={() => {
          setLoading(false);
          setErrorMessage('');
        }}
      />
    </SafeAreaView>
  );
}