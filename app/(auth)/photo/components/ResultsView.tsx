import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

type Props = {
  onBack: () => void;
  editedResults: string;
  onChangeResults: (text: string) => void;
  onRetake: () => void;
  onSubmit: () => void;
};

export function ResultsView({
  onBack,
  editedResults,
  onChangeResults,
  onRetake,
  onSubmit,
}: Props) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
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
    resultsContainer: {
      flex: 1,
      padding: 20,
    },
    message: {
      textAlign: "center",
      paddingBottom: 10,
      color: theme.colors.text.primary,
    },
    resultsInput: {
      flex: 1,
      backgroundColor: theme.colors.background.secondary,
      color: theme.colors.text.primary,
      padding: 15,
      borderRadius: 10,
      marginBottom: 20,
      textAlignVertical: "top",
    },
    previewButtons: {
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

      <ScrollView style={styles.resultsContainer}>
        <Text style={styles.message}>Review and edit the scanned text:</Text>
        <TextInput
          style={styles.resultsInput}
          multiline
          value={editedResults}
          onChangeText={onChangeResults}
        />
      </ScrollView>

      <View style={styles.previewButtons}>
        <TouchableOpacity style={styles.previewButton} onPress={onRetake}>
          <Text style={styles.previewButtonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.previewButton, styles.confirmButton]}
          onPress={onSubmit}
        >
          <Text style={styles.previewButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
