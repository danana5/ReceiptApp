import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { router } from "expo-router";
import { AuthTextInput } from "@/components/AuthTextInput";
import { doc, updateDoc } from "firebase/firestore";
import { usersCollection } from "@/firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase/storage";
import { Feather } from "@expo/vector-icons";
import { BottomNavBar } from "@/components/BottomNavBar";
import { useTheme } from "@/contexts/ThemeContext";

export default function EditProfilePage() {
  const { user, userDetails } = useAuth();
  const [firstName, setFirstName] = useState(userDetails?.firstName || "");
  const [lastName, setLastName] = useState(userDetails?.lastName || "");
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets[0].uri) {
      setIsLoading(true);
      try {
        const response = await fetch(result.assets[0].uri);
        const blob = await response.blob();

        const storageRef = ref(storage, `profile-pictures/${user?.uid}`);
        await uploadBytes(storageRef, blob);
        const downloadUrl = await getDownloadURL(storageRef);

        const userRef = doc(usersCollection, user?.uid);
        await updateDoc(userRef, {
          profilePictureUrl: downloadUrl,
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const userRef = doc(usersCollection, user.uid);
      await updateDoc(userRef, {
        firstName,
        lastName,
      });
      router.back();
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    content: {
      flex: 1,
      padding: 20,
    },
    imageContainer: {
      alignSelf: "center",
      marginVertical: 20,
      position: "relative",
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    placeholderImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: theme.colors.border,
      justifyContent: "center",
      alignItems: "center",
    },
    placeholderText: {
      fontSize: 32,
      color: theme.colors.text.secondary,
      fontWeight: "bold",
    },
    editIconOverlay: {
      position: "absolute",
      bottom: 0,
      right: 0,
      backgroundColor: theme.colors.primary,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: "center",
      alignItems: "center",
    },
    form: {
      gap: 16,
    },
    saveButton: {
      backgroundColor: theme.colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 20,
    },
    saveButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
    cancelButton: {
      backgroundColor: theme.colors.background.primary,
      borderColor: theme.colors.primary,
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
    },
    cancelButtonText: {
      color: theme.colors.primary,
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Pressable style={styles.imageContainer} onPress={pickImage}>
          {userDetails?.profilePictureUrl ? (
            <Image
              source={{ uri: userDetails.profilePictureUrl }}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>
                {firstName[0]}
                {lastName[0]}
              </Text>
            </View>
          )}
          <View style={styles.editIconOverlay}>
            <Feather name="camera" size={20} color="#fff" />
          </View>
        </Pressable>

        <View style={styles.form}>
          <AuthTextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
            autoCapitalize="words"
          />
          <AuthTextInput
            value={lastName}
            onChangeText={setLastName}
            placeholder="Last Name"
            autoCapitalize="words"
          />

          <Pressable
            style={styles.saveButton}
            onPress={handleSave}
            disabled={isLoading}
          >
            <Text style={styles.saveButtonText}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Text>
          </Pressable>

          <Pressable style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
      <BottomNavBar />
    </View>
  );
}
