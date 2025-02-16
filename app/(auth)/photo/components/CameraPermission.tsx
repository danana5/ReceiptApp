import { Button, StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";

type Props = {
  onRequestPermission: () => void;
};

export function CameraPermission({ onRequestPermission }: Props) {
  const { theme } = useTheme();

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
  });

  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        We need your permission to show the camera
      </Text>
      <Button onPress={onRequestPermission} title="grant permission" />
    </View>
  );
}
