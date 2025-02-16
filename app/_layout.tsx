import { Slot, useSegments, useRouter } from "expo-router";
import { useEffect } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Create a simple auth context/state (you can expand this later)
const useProtectedRoute = () => {
  const segments = useSegments();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const isProtectedRoute = segments[0] === "(auth)";

    if (!user && isProtectedRoute) {
      router.replace("/login");
    }
  }, [user, isLoading, segments]);
};

function RootLayoutNav() {
  useProtectedRoute();
  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
