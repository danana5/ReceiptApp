import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { BottomNavBar } from "@/components/BottomNavBar";
import { useTheme } from "@/contexts/ThemeContext";
import { signOut } from "@/firebase/authentication";

export default function ProfilePage() {
  const { theme } = useTheme();
  const { userDetails } = useAuth();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background.primary,
    },
    content: {
      flex: 1,
      position: "relative",
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
    profileHeader: {
      alignItems: "center",
      padding: 20,
      position: "relative",
    },
    imageContainer: {
      marginVertical: 20,
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
    editButton: {
      position: "absolute",
      top: 20,
      right: 20,
      padding: 10,
    },
    infoContainer: {
      paddingHorizontal: 20,
    },
    infoRow: {
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      color: theme.colors.text.secondary,
      marginBottom: 4,
    },
    value: {
      fontSize: 16,
      color: theme.colors.text.primary,
    },
    signOutButton: {
      marginTop: 32,
      marginHorizontal: 20,
      padding: 8,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    signOutText: {
      color: theme.colors.error,
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 8,
    },
  });

  if (!userDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => router.push("/home")}
        >
          <Feather name="chevron-left" size={24} color={theme.colors.primary} />
        </Pressable>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.imageContainer}>
            {userDetails.profilePictureUrl ? (
              <Image
                source={{ uri: userDetails.profilePictureUrl }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>
                  {userDetails.firstName[0]}
                  {userDetails.lastName[0]}
                </Text>
              </View>
            )}
          </View>

          <Pressable
            style={styles.editButton}
            onPress={() => router.push("/profile/edit")}
          >
            <Feather name="edit-2" size={24} color={theme.colors.primary} />
          </Pressable>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>
              {userDetails.firstName} {userDetails.lastName}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{userDetails.email}</Text>
          </View>

          <Pressable style={styles.signOutButton} onPress={() => signOut()}>
            <Feather name="log-out" size={20} color={theme.colors.error} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </Pressable>
        </View>
      </View>
      <BottomNavBar />
    </View>
  );
}
