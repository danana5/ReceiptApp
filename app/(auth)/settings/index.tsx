"use client";

import { View, Text, Switch, StyleSheet, Pressable } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { darkTheme, defaultTheme } from "@/theme";
import { BottomNavBar } from "@/components/BottomNavBar";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    content: {
      flex: 1,
      padding: 16,
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
    settingItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    settingLabel: {
      fontSize: 16,
      color: theme.colors.text.primary,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name="chevron-left" size={24} color={theme.colors.primary} />
        </Pressable>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Dark Mode</Text>
          <Switch
            value={theme === darkTheme}
            onValueChange={() =>
              setTheme(theme === defaultTheme ? darkTheme : defaultTheme)
            }
            trackColor={{
              false: theme.colors.border,
              true: theme.colors.primary,
            }}
            thumbColor={
              theme === darkTheme
                ? theme.colors.background.secondary
                : "#f4f3f4"
            }
          />
        </View>
      </View>

      <BottomNavBar />
    </View>
  );
}
