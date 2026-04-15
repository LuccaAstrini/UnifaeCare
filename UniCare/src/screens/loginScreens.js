import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailsub, setEmailSub] = useState('');
  const [passwordsub, setPasswordSub] = useState('');

  function login() {
    //Depois que começar a usar o asyncStorage usar o await
    //Alterar o emailsub e passwordsub para a func que guarda os dados do cadastro
    const verificaremail = emailsub;
    const verificarsenha = passwordsub;

    if (verificaremail && verificarsenha) {
      Alert.alert("Sucesso", `Bem-vindo, ${nomeEncontrado}!`);
    } else {
      Alert.alert("Erro", "E-mail ou Senha não cadastrado.");
      setEmail("")
      setPassword("")
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: 'https://static.vecteezy.com/system/resources/thumbnails/027/374/615/small/digital-health-logo-png.png' }}
          style={styles.logo}></Image>
        <Text style={styles.title}>Bem-vindo ao UNIFAE Care</Text>
        <Text style={styles.subtitle}>Entre com suas credenciais para continuar.</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>E-mail</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="nome@exemplo.com.br"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <Text style={styles.label}>Senha</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="........"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>RECUPERAR SENHA</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Não possui uma conta?</Text>
        <TouchableOpacity>
          <Text style={styles.signUpText}>Cadastre-se agora</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.legal}>
        <Text style={styles.legalText}>© 2024 UNIFAE CARE. CLINICAL EDITORIAL SYSTEM.</Text>
        <View style={styles.legalLinks}>
          <Text style={styles.legalLinkText}>PRIVACIDADE</Text>
          <Text style={styles.legalLinkText}>TERMOS</Text>
          <Text style={styles.legalLinkText}>ACESSIBILIDADE</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B4332',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingLeft: 300,
    paddingRight: 300,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 55,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 15,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 30,
  },
  forgotPasswordText: {
    color: '#2D6A4F',
    fontWeight: 'bold',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#2D6A4F',
    flexDirection: 'row',
    height: 55,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#666',
    fontSize: 15,
  },
  signUpText: {
    color: '#1B4332',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 5,
  },
  legal: {
    marginTop: 60,
    alignItems: 'center',
  },
  legalText: {
    fontSize: 10,
    color: '#999',
    marginBottom: 10,
  },
  legalLinks: {
    flexDirection: 'row',
    gap: 15,
  },
  legalLinkText: {
    fontSize: 10,
    color: '#999',
    textDecorationLine: 'underline',
  }
});