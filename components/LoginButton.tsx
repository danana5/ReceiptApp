import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
type ButtonProps = {
  title: string;
  onPress: () => void;
  style?: object;
  textStyle?: object;
  disabled?: boolean;
};

export const LoginButton = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
}: ButtonProps) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    button: {
      height: 50,
      backgroundColor: theme.colors.primary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
  });

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text disabled={disabled} style={[styles.buttonText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
