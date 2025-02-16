import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { BottomNavBar } from "@/components/BottomNavBar";

export default function InsightsPage() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: 48, // For status bar
      paddingBottom: 16,
      backgroundColor: theme.colors.background.secondary,
    },
    backButton: {
      padding: 8,
      marginRight: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.text.primary,
    },
    content: {
      flex: 1,
      padding: 16,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push("/home")}
        >
          <Feather name="chevron-left" size={24} color={theme.colors.primary} />
        </Pressable>
        <Text style={styles.title}>Insights</Text>
      </View>

      <View style={styles.content}>
        <Text>Insights Content</Text>
      </View>

      <BottomNavBar />
    </View>
  );
}
