import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { AuthTextInput } from '../../components/AuthTextInput';
import { PasswordInput } from '../../components/PasswordInput';
import { LoginButton } from '../../components/LoginButton';
import { router } from 'expo-router';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    router.push('/home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <AuthTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
      />
      <LoginButton title="Login" onPress={handleLogin} />
      <LoginButton
        title="Create Account"
        onPress={() => Alert.alert('Create Account', 'Feature coming soon!')}
        style={styles.createAccountButton}
        textStyle={styles.createAccountText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  createAccountButton: {
    backgroundColor: 'transparent',
  },
  createAccountText: {
    color: '#007bff',
  },
});


