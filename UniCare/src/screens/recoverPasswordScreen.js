import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from 'react-native';
import { GRAY_1, GREEN_1, GREEN_2, GREEN_3, GREEN_4, GREEN_5 } from '../styles/Colors';
import CustomText from '../components/CustomText';
import Card from '../components/cards/Card';
import CustomInput from '../components/CustomTextInput';
import PositiveButton from '../components/buttons/PositiveButton';
import AlertBanner from '../components/AlertBanner';

export default function RecuperarSenha({ navigation }) {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={{ flex: 2, backgroundColor: GREEN_4, alignItems: 'center' }}>
      <CustomText variant="title" style={{ textAlign: 'center', marginTop: 60, color: GREEN_1, fontSize: 34 }}>
        Recuperar senha
      </CustomText>

      <CustomText variant="bodyMedium" style={{ textAlign: 'center', marginTop: 30, color: GRAY_1, fontWeight: 'bold' }}>
        Insira seu e-mail para receber um código de 8 dígitos para redefinir sua senha.
      </CustomText>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 250 }}>
        <Card>
          <CustomText variant="caption" style={{ marginBottom: 5 }}>
            E-mail
          </CustomText>

          <CustomInput
            value={email}
            onChangeText={setEmail}
            placeholder="Digite seu e-mail"
            secureTextEntry={false}
          />

          <PositiveButton title="Enviar código" onPress={() => {
            Alert.alert("Código enviado", "Um código de 8 dígitos foi enviado para seu e-mail.");
            navigation.navigate('ResetPasswordView');
          }} />

          <CustomText variant="bodyMedium" style={{ marginBottom: 5, textAlign: 'center', margin: 40, color: GREEN_5, fontWeight: 'bold' }} onPress={() => navigation.goBack()}>
            Voltar ao Login
          </CustomText>
        </Card>
      </View>

      <View style={{ position: 'absolute', bottom: 125, width: '100%' }}>

        <AlertBanner title='Aviso!'
          message='Por motivos de segurança, o código de recuperação expira em 15 minutos. Verifique sua caixa de spam caso não receba o e-mail em instantes.' />
      </View>
    </SafeAreaView>
  );
}
