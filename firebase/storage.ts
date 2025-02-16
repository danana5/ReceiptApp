import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "./config";

// Initialize Firebase Storage
export const storage = getStorage(app);

// Helper function to upload a file to Firebase Storage
export const uploadFile = async (file: Blob, path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// Helper function to delete a file from Firebase Storage
export const deleteFile = async (path: string): Promise<void> => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

// Helper function to get a file's download URL from Firebase Storage
export const getFile = async (path: string): Promise<string> => {
  try {
    const storageRef = ref(storage, path);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error getting file:", error);
    throw error;
  }
};

// Helper function to get multiple files' download URLs from Firebase Storage
export const getBulkFiles = async (paths: string[]): Promise<string[]> => {
  try {
    const downloadPromises = paths.map((path) => {
      const storageRef = ref(storage, path);
      return getDownloadURL(storageRef);
    });

    const downloadURLs = await Promise.all(downloadPromises);
    return downloadURLs;
  } catch (error) {
    console.error("Error getting files:", error);
    throw error;
  }
};
