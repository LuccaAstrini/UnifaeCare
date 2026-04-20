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

export default function RecuperarSenha() {
  const [email, setEmail] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.backText}>← UNIFAE Care</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.logoBox}>
            <View style={styles.logoIcon}>
               <Text style={{color: '#fff', fontSize: 20}}>U</Text>
            </View>
            <Text style={styles.logoText}>unifae care</Text>
          </View>

          <Text style={styles.mainTitle}>Recuperar Senha</Text>
          <Text style={styles.description}>
            Insira seu e-mail para receber um código de 8 dígitos para redefinir sua conta.
          </Text>

          <View style={styles.card}>
            <Text style={styles.label}>ENDEREÇO DE E-MAIL</Text>
            <View style={styles.inputRow}>
              <Text style={styles.mailEmoji}>✉️</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity 
              style={styles.btn}
              onPress={() => Alert.alert('Sucesso', 'Código enviado para: ' + email)}
            >
              <Text style={styles.btnText}>Enviar Código de Recuperação</Text>
            </TouchableOpacity>

            <Text style={styles.backLink}>← Voltar ao Login</Text>
          </View>

          <View style={styles.infoBox}>
             <Text style={styles.infoTitle}>ⓘ Informação Importante</Text>
             <Text style={styles.infoText}>
               Por motivos de segurança, o código de recuperação expira em 15 minutos.
             </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FDF2C1' },
  container: { paddingBottom: 40 },
  header: { padding: 20, paddingTop: 40 },
  backText: { fontSize: 18, color: '#333', fontWeight: '500' },
  content: { paddingHorizontal: 25, alignItems: 'center' },
  logoBox: { backgroundColor: '#1C1C1E', padding: 10, borderRadius: 12, alignItems: 'center', marginBottom: 20, width: 70, height: 70, justifyContent: 'center' },
  logoIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  logoText: { color: '#34C759', fontSize: 9, fontWeight: 'bold', marginTop: 2 },
  mainTitle: { fontSize: 26, fontWeight: 'bold', color: '#1C1C1E', marginBottom: 10, textAlign: 'center' },
  description: { textAlign: 'center', color: '#333', marginBottom: 30, lineHeight: 22, fontSize: 16 },
  card: { backgroundColor: '#FFFEF5', padding: 20, borderRadius: 15, width: '100%', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  label: { fontSize: 12, color: '#777', marginBottom: 8, fontWeight: '600' },
  inputRow: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#D1D1D6', borderRadius: 10, paddingHorizontal: 12, backgroundColor: '#FFF' },
  mailEmoji: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, height: 50, color: '#333' },
  btn: { backgroundColor: '#2A8C4A', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 20, marginBottom: 15 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  backLink: { textAlign: 'center', color: '#333', fontSize: 15 },
  infoBox: { backgroundColor: '#E9F9EE', padding: 18, borderRadius: 12, marginTop: 30, width: '100%', borderLeftWidth: 4, borderLeftColor: '#2A8C4A' },
  infoTitle: { color: '#2A8C4A', fontWeight: 'bold', marginBottom: 5, fontSize: 15 },
  infoText: { color: '#333', fontSize: 13, lineHeight: 18 },
});