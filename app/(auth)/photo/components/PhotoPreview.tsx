import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

type Props = {
  photo: string;
  onBack: () => void;
  onRetake: () => void;
  onConfirm: () => void;
};

export function PhotoPreview({ photo, onBack, onRetake, onConfirm }: Props) {
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
    previewButtons: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 20,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    previewButton: {
      padding: 15,
      borderRadius: 10,
      backgroundColor: theme.colors.text.secondary,
      width: 120,
      alignItems: "center",
    },
    confirmButton: {
      backgroundColor: theme.colors.primary,
    },
    previewButtonText: {
      color: theme.colors.background.primary,
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Feather name="chevron-left" size={24} color="white" />
      </TouchableOpacity>

      <Image source={{ uri: photo }} style={styles.preview} />

      <View style={styles.previewButtons}>
        <TouchableOpacity style={styles.previewButton} onPress={onRetake}>
          <Text style={styles.previewButtonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.previewButton, styles.confirmButton]}
          onPress={onConfirm}
        >
          <Text style={styles.previewButtonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
