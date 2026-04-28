import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '../../components/CustomText';
import { GRAY_1, GREEN_1, GREEN_3, GREEN_4, GREEN_5 } from '../styles/Colors';
import Card from '../../components/Card';
import CustomInput from '../../components/CustomTextInput';
import PositiveButton from '../../components/PositiveButton';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailsub, setEmailSub] = useState('');
  const [passwordsub, setPasswordSub] = useState('');

  function login() {
    //Depois que começar a usar o asyncStorage usar o await
    //Alterar o emailsub e passwordsub para a func que guarda os dados do cadastro
    const verificaremail = emailsub;
    const verificarsenha = passwordsub;

    //navigation.navigate('Home');
    // if (verificaremail && verificarsenha) {
    //   Alert.alert("Sucesso", `Bem-vindo, ${nomeEncontrado}!`);
    // } else {
    //   Alert.alert("Erro", "E-mail ou Senha não cadastrado.");
    //   setEmail("")
    //   setPassword("")
    // }
  }

  return (
    <SafeAreaView style={{ flex: 2, backgroundColor: GREEN_4 }}>
      <CustomText variant="title" style={{ textAlign: 'center', marginTop: 60, color: GREEN_1, fontSize: 34 }}>
        Bem-vindo ao UNIFAE Care
      </CustomText>

      <View style={{ flex: 1, justifyContent: 'center', marginBottom: 150 }}>
        <Card>
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

          <PositiveButton onPress={() => { navigation.navigate('Tab') }} title='Entrar' />

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
    </SafeAreaView>
  );
}