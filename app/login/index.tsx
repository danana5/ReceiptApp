import React, { useState } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { AuthTextInput } from "../../components/AuthTextInput";
import { PasswordInput } from "../../components/PasswordInput";
import { LoginButton } from "../../components/LoginButton";
import { router } from "expo-router";
import { GoogleLogo } from "@/assets/svg/google";

// Public route
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    router.push("/home");
  };

  const handleGoogleSignIn = () => {
    Alert.alert("Hello!", "Google Sign-In clicked!");
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
        onPress={() => Alert.alert("Create Account", "Feature coming soon!")}
        style={styles.createAccountButton}
        textStyle={styles.createAccountText}
      />
      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
      >
        <GoogleLogo />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>
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
  createAccountButton: {
    backgroundColor: "transparent",
  },
  createAccountText: {
    color: "#007bff",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});
