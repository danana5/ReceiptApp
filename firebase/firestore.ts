import { getFirestore, collection } from "firebase/firestore";
import { app } from "./config";

// Initialize Firestore
export const db = getFirestore(app);

// Create a reference to the users collection
export const usersCollection = collection(db, "users");
