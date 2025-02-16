import {
  createUserWithEmailAndPassword,
  getAuth,
  Persistence,
  setPersistence,
} from "firebase/auth";
import {
  signInWithEmailAndPassword,
  getReactNativePersistence,
} from "firebase/auth";
import { app } from "./config";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";

export const auth = getAuth(app);

export async function signIn(email: string, password: string) {
  setPersistence(auth, getReactNativePersistence(ReactNativeAsyncStorage))
    .then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          Alert.alert("Sign in successful");
          router.replace("/(auth)/home");
        })
        .catch((error) => {
          console.error("Sign in error:", error);
          throw error;
        });
    })
    .catch((error) => {
      console.error("Error setting persistence:", error);
      throw error;
    });
}

export async function createAccount(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      Alert.alert("Account created successfully");
      router.replace("/(auth)/home");
    })
    .catch((error) => {
      console.error("Account creation error:", error);
      throw error;
    });
}

export async function signOut() {
  auth.signOut().then(() => {
    Alert.alert("Sign out successful");
    router.replace("/login");
  });
}
