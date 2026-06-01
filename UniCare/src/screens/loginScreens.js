import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ErrorModal from '../components/modals/ErrorModal';
import LoadingModal from '../components/modals/LoadingModal';
import CustomText from '../components/CustomText';
import { GRAY_1, GREEN_1, GREEN_3, GREEN_4, GREEN_5 } from '../styles/Colors';
import Card from '../components/cards/Card';
import CustomInput from '../components/CustomTextInput';
import PositiveButton from '../components/buttons/PositiveButton';
import { useLogin } from '../hooks/useLogin';

export default function LoginScreen({ navigation, route }) {
  const vm = useLogin(navigation, route);

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
            value={vm.email}
            onChangeText={vm.setEmail}
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
              onPress={vm.handleNavigateToRecover}
            >
              Recuperar senha
            </CustomText>
          </View>

          <CustomInput
            value={vm.password}
            onChangeText={vm.setPassword}
            placeholder="Digite sua senha"
            secureTextEntry={true}
          />

          <PositiveButton onPress={vm.handleLogin} title='Entrar' enabled={!vm.loading} />

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
              onPress={vm.handleNavigateToRecover}
            >
              Novo por aqui?
            </CustomText>
            <CustomText variant="label" style={{ color: GREEN_5 }}>
              Registre-se
            </CustomText>
          </View>
        </Card>
      </View>

      {vm.loading
        ? <LoadingModal visible={true} message='Verificando credenciais' />
        : <ErrorModal visible={!!vm.error} message={vm.error} onClose={vm.clearError} />
      }
    </SafeAreaView>
  );
}
