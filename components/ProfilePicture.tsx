import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { router } from "expo-router";

interface ProfilePictureProps {
  size?: number;
  showBorder?: boolean;
  onPress?: () => void;
}

export function ProfilePicture({
  size = 40,
  showBorder = true,
  onPress,
}: ProfilePictureProps) {
  const { userDetails } = useAuth();
  const { theme } = useTheme();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push("/(auth)/settings");
    }
  };

  const styles = StyleSheet.create({
    container: {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: showBorder ? 2 : 0,
      borderColor: theme.colors.primary,
      overflow: "hidden",
    },
    image: {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    placeholderImage: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: theme.colors.border,
      justifyContent: "center",
      alignItems: "center",
    },
    placeholderText: {
      fontSize: size * 0.4,
      color: theme.colors.text.secondary,
      fontWeight: "bold",
    },
  });

  if (!userDetails) return null;

  return (
    <Pressable onPress={handlePress}>
      {userDetails.profilePictureUrl ? (
        <View style={styles.container}>
          <Image
            source={{ uri: userDetails.profilePictureUrl }}
            style={styles.image}
          />
        </View>
      ) : (
        <View style={[styles.container, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>
            {userDetails.firstName[0]}
            {userDetails.lastName[0]}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
