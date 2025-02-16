import { CameraView as ExpoCamera } from "expo-camera";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

type Props = {
  onBack: () => void;
  onTakePhoto: () => void;
  camera: any;
  setCamera: (camera: any) => void;
  flash: boolean;
  onToggleFlash: () => void;
};

export function CameraViewComponent({
  onBack,
  onTakePhoto,
  camera,
  setCamera,
  flash,
  onToggleFlash,
}: Props) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "transparent",
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: "flex-end",
      alignItems: "center",
    },
    text: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.background.primary,
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
    flashButton: {
      position: "absolute",
      bottom: 40,
      right: 20,
      zIndex: 1,
      padding: 8,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: "center",
      alignItems: "center",
    },
    activeFlash: {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Feather name="chevron-left" size={24} color="white" />
      </TouchableOpacity>

      <ExpoCamera
        style={styles.camera}
        facing={"back"}
        ref={(ref) => setCamera(ref)}
        flash={flash ? "on" : "off"}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </ExpoCamera>

      <TouchableOpacity
        style={[styles.flashButton, flash && styles.activeFlash]}
        onPress={onToggleFlash}
      >
        <Feather name={flash ? "zap" : "zap-off"} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
