import { GoogleLogo } from "@/assets/svg/google";
import { TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { auth } from "@/firebase/authentication";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { useEffect } from "react";

WebBrowser.maybeCompleteAuthSession();

export const GoogleAuthButton = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      const credential = GoogleAuthProvider.credential(authentication?.idToken);
      signInWithCredential(auth, credential)
        .then((userCredential) => {
          console.log("User signed in:", userCredential.user);
        })
        .catch((error) => console.error("Error signing in:", error));
    }
  }, [response]);

  return (
    <TouchableOpacity
      style={styles.googleButton}
      onPress={() => promptAsync()}
      disabled={!request}
    >
      <GoogleLogo />
      <Text style={styles.googleButtonText}>Continue with Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  googleButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
});
