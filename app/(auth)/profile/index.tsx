import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ProfilePage() {
  const { userDetails } = useAuth();

  if (!userDetails) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton} onPress={() => router.push("/home")}>
        <Feather name="chevron-left" size={24} color="#007AFF" />
      </Pressable>

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
          <Feather name="edit-2" size={24} color="#007AFF" />
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    backgroundColor: "#E1E1E1",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 32,
    color: "#666",
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
    color: "#666",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#000",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    padding: 10,
    zIndex: 1,
  },
});
