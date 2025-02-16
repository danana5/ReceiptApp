import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";
import { TouchableOpacity } from "react-native";

type Props = {
  photo: string;
  onBack: () => void;
};

export function ScanningView({ photo, onBack }: Props) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    preview: {
      flex: 1,
      width: "100%",
    },
    scanningContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.8)",
    },
    loadingText: {
      color: "white",
      marginTop: 16,
      fontSize: 18,
      fontWeight: "500",
    },
    backButton: {
      position: "absolute",
      top: 40,
      left: 20,
      zIndex: 1,
      padding: 8,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Feather name="chevron-left" size={24} color="white" />
      </TouchableOpacity>
      <Image source={{ uri: photo }} style={styles.preview} />
      <View style={styles.scanningContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Scanning your receipt...</Text>
      </View>
    </View>
  );
}
