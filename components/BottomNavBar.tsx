import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

export function BottomNavBar() {
  const { theme } = useTheme();
  const pathname = usePathname();

  const styles = StyleSheet.create({
    bottomBar: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: theme.colors.background.primary,
      paddingVertical: 2,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      height: 80,
    },
    bottomBarButton: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      flex: 1,
    },
    cameraButton: {
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      flex: 1,
      marginTop: -25,
    },
    cameraButtonInner: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      elevation: 4,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },
    bottomBarText: {
      marginTop: 5,
      fontSize: 12,
      color: theme.colors.text.primary,
    },
    bottomBarTextActive: {
      marginTop: 5,
      fontSize: 12,
      color: theme.colors.primary,
    },
  });

  const isRouteActive = (route: string) => {
    const cleanPath = pathname.replace(/\/$/, "");
    const expectedPath = route.replace("/(auth)", "");

    const isActive = cleanPath === expectedPath;
    return isActive;
  };

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity
        style={styles.bottomBarButton}
        onPress={() => router.push("/(auth)/home")}
      >
        <Ionicons
          name="home"
          size={24}
          color={
            isRouteActive("/(auth)/home")
              ? theme.colors.primary
              : theme.colors.text.primary
          }
        />
        <Text
          style={
            isRouteActive("/(auth)/home")
              ? styles.bottomBarTextActive
              : styles.bottomBarText
          }
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomBarButton}
        onPress={() => router.push("/(auth)/receipts")}
      >
        <Ionicons
          name="receipt"
          size={24}
          color={
            isRouteActive("/(auth)/receipts")
              ? theme.colors.primary
              : theme.colors.text.primary
          }
        />
        <Text
          style={
            isRouteActive("/(auth)/receipts")
              ? styles.bottomBarTextActive
              : styles.bottomBarText
          }
        >
          Receipts
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cameraButton}
        onPress={() => router.push("/photo")}
      >
        <View
          style={[
            styles.cameraButtonInner,
            { backgroundColor: theme.colors.primary },
          ]}
        >
          <Ionicons name="camera" size={28} color="#fff" />
        </View>
        <Text style={styles.bottomBarText}>Add Receipt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomBarButton}
        onPress={() => router.push("/(auth)/insights")}
      >
        <Ionicons
          name="bar-chart"
          size={24}
          color={
            isRouteActive("/(auth)/insights")
              ? theme.colors.primary
              : theme.colors.text.primary
          }
        />
        <Text
          style={
            isRouteActive("/(auth)/insights")
              ? styles.bottomBarTextActive
              : styles.bottomBarText
          }
        >
          Insights
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bottomBarButton}
        onPress={() => router.push("/(auth)/settings")}
      >
        <Ionicons
          name="settings"
          size={24}
          color={
            isRouteActive("/(auth)/settings")
              ? theme.colors.primary
              : theme.colors.text.primary
          }
        />
        <Text
          style={
            isRouteActive("/(auth)/settings")
              ? styles.bottomBarTextActive
              : styles.bottomBarText
          }
        >
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}
