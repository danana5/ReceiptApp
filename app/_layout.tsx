import { Slot, useSegments, useRouter } from "expo-router";
import { useEffect } from "react";
import { auth } from "@/firebase/authentication";

// Create a simple auth context/state (you can expand this later)
const useProtectedRoute = (isAuthenticated: boolean) => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isLoginPage = segments[0] === "login";

    if (!isAuthenticated && !isLoginPage) {
      // Redirect to login if not authenticated and not already on login
      router.replace("/login");
    } else if (isAuthenticated && isLoginPage) {
      // Redirect to home if authenticated and trying to access login
      router.replace("/(auth)/home");
    }
  }, [isAuthenticated, segments]);
};

export default function RootLayout() {
  // Replace this with your actual auth state
  const isAuthenticated = auth.currentUser !== null;

  useProtectedRoute(isAuthenticated);

  return <Slot />;
}
