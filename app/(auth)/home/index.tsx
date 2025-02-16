import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { BottomNavBar } from "@/components/BottomNavBar";
import { useTheme } from "@/contexts/ThemeContext";

export default function HomePage() {
  const { userDetails } = useAuth();
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.secondary,
    },
    content: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
    },
    welcomeText: {
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: theme.colors.text.primary,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      color: theme.colors.text.primary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Welcome {userDetails?.firstName}!
        </Text>
        <Text style={styles.title}>Welcome to the Home Page!</Text>
      </View>

      <BottomNavBar />
    </View>
  );
}
