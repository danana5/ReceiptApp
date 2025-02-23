import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { AuthTextInput } from "../../components/AuthTextInput";
import { PasswordInput } from "../../components/PasswordInput";
import { LoginButton } from "../../components/LoginButton";
import { signIn } from "@/firebase/authentication";
import { GoogleAuthButton } from "@/components/GoogleAuthButton";
import { router } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { Logo } from "@/components/Logo";

// Public route
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: theme.colors.background.primary,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      textAlign: "center",
      color: theme.colors.text.primary,
    },
    createAccountButton: {
      backgroundColor: "transparent",
    },
    createAccountText: {
      color: theme.colors.primary,
    },
  });
  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert("Error", "Failed to sign in");
      console.error(error);
    }
  };

  const handleCreateAccount = () => {
    router.push("/signup");
  };

  return (
    <View style={styles.container}>
      <Logo />
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
        onPress={handleCreateAccount}
        style={styles.createAccountButton}
        textStyle={styles.createAccountText}
      />
      <GoogleAuthButton />
    </View>
  );
}
