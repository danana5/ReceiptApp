import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User } from "firebase/auth";
import { auth } from "@/firebase/authentication";
import { onSnapshot } from "firebase/firestore";
import { doc } from "firebase/firestore";
import { usersCollection } from "@/firebase/firestore";

type AuthContextType = {
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
};

type UserDetails = {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: number;
  profilePictureUrl: string | null;
  receipts: Array<string>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  userDetails: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setIsLoading(false);
    });

    return unsubscribe; // Cleanup subscription
  }, []);

  useEffect(() => {
    if (user) {
      const userDoc = doc(usersCollection, user.uid);
      const unsubscribe = onSnapshot(userDoc, (doc) => {
        setUserDetails({
          firstName: doc.data()?.firstName || "",
          lastName: doc.data()?.lastName || "",
          email: doc.data()?.email || "",
          createdAt: doc.data()?.createdAt || 0,
          profilePictureUrl: doc.data()?.profilePictureUrl || null,
          receipts: doc.data()?.receipts || [],
        });
      });

      return unsubscribe; // Cleanup subscription
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isLoading, userDetails }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
