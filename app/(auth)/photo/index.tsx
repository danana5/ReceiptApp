import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/contexts/ThemeContext";

export default function Photo() {
  const { theme } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState<CameraView | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    message: {
      textAlign: "center",
      paddingBottom: 10,
      color: theme.colors.text.primary,
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
    preview: {
      flex: 1,
      width: "100%",
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

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  async function takePhoto() {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo?.uri || null);
    }
  }

  function retakePhoto() {
    setPhoto(null);
  }

  function confirmPhoto() {
    // TODO: Handle photo upload
    console.log("Confirming photo:", photo);
    router.back();
  }

  if (photo) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="chevron-left" size={24} color="white" />
        </TouchableOpacity>

        <Image source={{ uri: photo }} style={styles.preview} />

        <View style={styles.previewButtons}>
          <TouchableOpacity style={styles.previewButton} onPress={retakePhoto}>
            <Text style={styles.previewButtonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.previewButton, styles.confirmButton]}
            onPress={confirmPhoto}
          >
            <Text style={styles.previewButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Feather name="chevron-left" size={24} color="white" />
      </TouchableOpacity>

      <CameraView
        style={styles.camera}
        facing={"back"}
        ref={(ref) => setCamera(ref)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePhoto}>
            <Text style={styles.text}>Take Photo</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}
