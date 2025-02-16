import React, { useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Expo includes this icon set by default

type PasswordInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const PasswordInput = ({
  value,
  onChangeText,
  placeholder = "Enter password",
  disabled = false,
}: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        marginBottom: 15,
      }}
    >
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={!isPasswordVisible}
        autoCapitalize="none"
        style={{
          flex: 1,
          padding: 10,
        }}
        editable={!disabled}
      />
      <TouchableOpacity
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        style={{ padding: 10 }}
        disabled={disabled}
      >
        <Ionicons
          name={isPasswordVisible ? "eye-off" : "eye"}
          size={19}
          color="#666"
        />
      </TouchableOpacity>
    </View>
  );
};
