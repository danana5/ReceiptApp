import { LoginButton } from "@/components/LoginButton";
import { router } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";
import { signOut } from "@/firebase/authentication";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the Home Page!</Text>
      <LoginButton title="Photo" onPress={() => router.push("/photo")} />
      <Button title="Sign Out" onPress={() => signOut()} />
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
    textAlign: "center",
  },
});
