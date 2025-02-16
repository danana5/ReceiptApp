import { Slot, useSegments, useRouter } from "expo-router";
import { useEffect } from "react";
import { auth } from "@/firebase/authentication";

// Create a simple auth context/state (you can expand this later)
const useProtectedRoute = (isAuthenticated: boolean) => {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isProtectedRoute = segments[0] === "(auth)";

    if (!isAuthenticated && isProtectedRoute) {
      router.replace("/login");
    }
  }, [isAuthenticated, segments]);
};

export default function RootLayout() {
  const isAuthenticated = !!auth.currentUser;

  useProtectedRoute(isAuthenticated);

  return <Slot />;
}
