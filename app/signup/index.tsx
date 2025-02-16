import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { AuthTextInput } from "../../components/AuthTextInput";
import { PasswordInput } from "../../components/PasswordInput";
import { LoginButton } from "../../components/LoginButton";
import { createAccount } from "@/firebase/authentication";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { router } from "expo-router";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await createAccount(email, password);
    } catch (error) {
      Alert.alert("Error", "Failed to create account");
      console.error(error);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <AuthTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="Create password"
      />
      <PasswordInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
      />
      <LoginButton title="Create Account" onPress={handleSignup} />
      <LoginButton
        title="Already have an account? Login"
        onPress={handleLogin}
        style={styles.loginButton}
        textStyle={styles.loginText}
      />
      <GoogleAuthButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  loginButton: {
    backgroundColor: "transparent",
  },
  loginText: {
    color: "#007bff",
  },
});
