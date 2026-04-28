import { useState, useCallback } from "react";
import { TouchableOpacity, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GRAY_1, GREEN_1, GREEN_4, GREEN_5 } from "../styles/Colors";
import CustomText from "../../components/CustomText";
import AlertBanner from "../../components/AlertBanner";
import Card from "../../components/Card";
import CustomInput from "../../components/CustomTextInput";
import PositiveButton from "../../components/PositiveButton";

const INITIAL_FORM_STATE = {
  email: "",
  verificationCode: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ResetPasswordScreen({ navigation }) {
  const [form, setForm] = useState(INITIAL_FORM_STATE);

  const handleChange = useCallback((field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    const { email, verificationCode, newPassword, confirmPassword } = form;
    console.log("Form data:", { email, verificationCode, newPassword, confirmPassword });
  }, [form]);

  return (
    <SafeAreaView style={{ flex: 2, backgroundColor: GREEN_4 }}>
      <CustomText variant="title" style={{ textAlign: 'center', marginTop: 60, color: GREEN_1, fontSize: 34 }}>
        Alterar senha
      </CustomText>

      <CustomText variant="bodyMedium" style={{ marginBottom: 15, textAlign: 'center', marginTop: 30, color: GRAY_1, fontWeight: 'bold' }}>
        Redefina sua senha para continuar acessando seus dados clínicos e acadêmicos com total sergurança.
      </CustomText>

      <AlertBanner title="Dica de segurança" message='Utilize uma senha com no mínimo 8 caracteres, incluindo letras maiúsculas, números e um símbolo especial.' />

      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Card>
          <CustomText variant="caption" style={{ marginBottom: 5 }}>
            E-mail
          </CustomText>

          <CustomInput
            value={form.email}
            onChangeText={handleChange("email")}
            placeholder="Digite seu e-mail"
            secureTextEntry={false}
          />

          <CustomText variant="caption" style={{ marginBottom: 5 }}>
            Código de verificação
          </CustomText>

          <CustomInput
            value={form.verificationCode}
            onChangeText={handleChange("verificationCode")}
            placeholder="Digite seu código de verificação"
            secureTextEntry={false}
          />

          <CustomText variant="caption" style={{ marginBottom: 5 }}>
            Nova senha
          </CustomText>

          <CustomInput
            value={form.newPassword}
            onChangeText={handleChange("newPassword")}
            placeholder="Digite sua nova senha"
            secureTextEntry={true}
          />

          <CustomText variant="caption" style={{ marginBottom: 5 }}>
            Confirmar nova senha
          </CustomText>

          <CustomInput
            value={form.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            placeholder="Confirme sua nova senha"
            secureTextEntry={true}
          />

          <PositiveButton title="Atualizar senha" onPress={() => {
            navigation.navigate('LoginView');
          }} />

          <CustomText variant="bodyMedium" style={{ marginBottom: 5, textAlign: 'center', margin: 40, color: GREEN_5, fontWeight: 'bold' }} onPress={() => navigation.goBack()}>
            Voltar ao Login
          </CustomText>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "normal",
  },
  card: {
    backgroundColor: "#e6e6e6",
    padding: 15,
    borderRadius: 10,
    width: "100%",
  },
  label: {
    color: "#56d152",
    fontWeight: "bold",
    paddingVertical: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#56d152",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});