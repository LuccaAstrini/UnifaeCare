import { useState, useCallback } from "react";
import { TouchableOpacity, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const INITIAL_FORM_STATE = {
  email: "",
  verificationCode: "",
  newPassword: "",
  confirmPassword: "",
};

export default function ResetPasswordScreen() {
  const [form, setForm] = useState(INITIAL_FORM_STATE);

  const handleChange = useCallback((field) => (value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    const { email, verificationCode, newPassword, confirmPassword } = form;
    console.log("Form data:", { email, verificationCode, newPassword, confirmPassword });
  }, [form]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Recuperação de Acesso</Text>
      <Text style={styles.subtitle}>
        Redefina sua senha para continuar acessando seus dados clínicos e
        acadêmicos com total segurança
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder="Digite seu email"
          inputMode="email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={form.email}
          onChangeText={handleChange("email")}
          style={styles.input}
        />

        <Text style={styles.label}>Código de verificação</Text>
        <TextInput
          placeholder="0 0 0 0 - 0 0 0 0"
          inputMode="numeric"
          value={form.verificationCode}
          onChangeText={handleChange("verificationCode")}
          style={styles.input}
        />

        <Text style={styles.label}>Nova senha</Text>
        <TextInput
          placeholder="* * * * *"
          secureTextEntry
          value={form.newPassword}
          onChangeText={handleChange("newPassword")}
          style={styles.input}
        />

        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput
          placeholder="* * * * *"
          secureTextEntry
          value={form.confirmPassword}
          onChangeText={handleChange("confirmPassword")}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Atualizar senha</Text>
        </TouchableOpacity>
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