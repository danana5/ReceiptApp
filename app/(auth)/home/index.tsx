import { LoginButton } from "@/components/LoginButton";
import { router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { signOut } from "@/firebase/authentication";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const { userDetails } = useAuth();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome {userDetails?.firstName}!
        </Text>
        <Text style={styles.title}>Welcome to the Home Page!</Text>
      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.bottomBarButton}
          onPress={() => router.push("/photo")}
        >
          <Ionicons name="camera" size={24} color="#333" />
          <Text style={styles.bottomBarText}>Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomBarButton}
          onPress={() => router.push("/(auth)/profile")}
        >
          <Ionicons name="person" size={24} color="#333" />
          <Text style={styles.bottomBarText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.bottomBarButton}
          onPress={() => signOut()}
        >
          <Ionicons name="log-out" size={24} color="#333" />
          <Text style={styles.bottomBarText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 2,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  bottomBarButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  bottomBarText: {
    marginTop: 5,
    fontSize: 12,
    color: "#333",
  },
});
