import { useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { AuthTextInput } from "../../components/AuthTextInput";
import { PasswordInput } from "../../components/PasswordInput";
import { LoginButton } from "../../components/LoginButton";
import { createAccount } from "@/firebase/authentication";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { router } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { Logo } from "@/components/Logo";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { theme } = useTheme();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      await createAccount({
        email,
        password,
        firstName,
        lastName,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to create account");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: theme.colors.background.secondary,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: theme.colors.text.primary,
    },
    loginButton: {
      backgroundColor: "transparent",
    },
    loginText: {
      color: theme.colors.primary,
    },
    loader: {
      marginTop: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Logo />
      <AuthTextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        disabled={isLoading}
      />
      <AuthTextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        disabled={isLoading}
      />
      <AuthTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        disabled={isLoading}
      />
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="Create password"
        disabled={isLoading}
      />
      <PasswordInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        disabled={isLoading}
      />
      <LoginButton
        title="Create Account"
        onPress={handleSignup}
        disabled={isLoading}
      />
      {isLoading && (
        <ActivityIndicator size="large" color="#007bff" style={styles.loader} />
      )}
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
