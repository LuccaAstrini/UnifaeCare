import React, { useEffect } from 'react';
import ErrorModal from '../components/modals/ErrorModal';
import LoadingModal from '../components/modals/LoadingModal';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '../components/CustomText';
import { GRAY_1, GREEN_1, GREEN_3, GREEN_4, GREEN_5 } from '../styles/Colors';
import Card from '../components/cards/Card';
import CustomInput from '../components/CustomTextInput';
import PositiveButton from '../components/buttons/PositiveButton';
import { useRequest } from '../hooks/useRequest';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation, route }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { loading, error, clearError, setError, run } = useRequest();
  const { signIn } = useAuth();

  useEffect(() => {
    if (route.params?.sessionExpiredMessage) {
      setError(route.params.sessionExpiredMessage);
    }
  }, [route.params?.sessionExpiredMessage]);

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function login() {
    if (email.trim() === '' || password.trim() === '') {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve conter pelo menos 6 caracteres.');
      return;
    }

    await run(async () => {
      await signIn(email, password);
      navigation.reset({ index: 0, routes: [{ name: 'Tab' }] });
    }, (e) => {
      if (e.status === 400) return 'Email inválido. Por favor, verifique o formato do seu e-mail.';
      if (e.status === 401) return 'Credenciais inválidas. Por favor, verifique seu e-mail e senha.';
      return 'Erro ao realizar login!';
    });
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
            placeholder="Digite seu e-mail"
            secureTextEntry={false}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <CustomText variant="caption" style={{ marginBottom: 5 }}>
              Senha
            </CustomText>
            <CustomText
              variant="caption"
              style={{ fontWeight: 'bold', marginBottom: 5, color: GREEN_3 }}
              onPress={() => navigation.navigate('RecoverPasswordView')}
            >
              Recuperar senha
            </CustomText>
          </View>

          <CustomInput
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry={true}
          />

          <PositiveButton onPress={login} title='Entrar' enabled={!loading} />

          <View style={{
            alignItems: 'center',
            borderBottomWidth: 3,
            marginTop: 40,
            borderBottomColor: GRAY_1,
            borderRadius: 10,
          }} />

          <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'center' }}>
            <CustomText
              variant="label"
              style={{ marginHorizontal: 5, color: GRAY_1 }}
              onPress={() => navigation.navigate('RecoverPasswordView')}
            >
              Novo por aqui?
            </CustomText>
            <CustomText variant="label" style={{ color: GREEN_5 }}>
              Registre-se
            </CustomText>
          </View>
        </Card>
      </View>

      {loading
        ? <LoadingModal visible={true} message='Verificando credenciais' />
        : <ErrorModal visible={!!error} message={error} onClose={clearError} />
      }
    </SafeAreaView>
  );
}
