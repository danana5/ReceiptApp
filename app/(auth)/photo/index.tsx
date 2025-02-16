import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@/contexts/ThemeContext";
import { CameraPermission } from "./components/CameraPermission";
import { CameraViewComponent } from "./components/CameraView";
import { PhotoPreview } from "./components/PhotoPreview";
import { ScanningView } from "./components/ScanningView";
import { ResultsView } from "./components/ResultsView";

export default function Photo() {
  const { theme } = useTheme();
  const [permission, requestPermission] = useCameraPermissions();
  const [camera, setCamera] = useState<CameraView | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState<string>("");
  const [editedResults, setEditedResults] = useState<string>("");
  const [flash, setFlash] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return <CameraPermission onRequestPermission={requestPermission} />;
  }

  async function takePhoto() {
    if (camera) {
      const photo = await camera.takePictureAsync();
      setPhoto(photo?.uri || null);
    }
  }

  function retakePhoto() {
    setPhoto(null);
    setScanResults("");
    setEditedResults("");
  }

  async function scanReceipt(imageUri: string) {
    setIsScanning(true);
    try {
      // Convert image URI to base64
      const response = await fetch(imageUri);
      const blob = await response.blob();
      const base64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });

      // Remove data:image/jpeg;base64, prefix
      const base64Image = (base64 as string).split(",")[1];

      // Call Google Cloud Vision API
      const visionResponse = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          process.env.FIREBASE_API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64Image,
                },
                features: [
                  {
                    type: "TEXT_DETECTION",
                    maxResults: 1,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await visionResponse.json();

      if (!visionResponse.ok) {
        console.error("Vision API Error:", data);
        throw new Error(data.error?.message || "API request failed");
      }

      if (data.responses?.[0]?.fullTextAnnotation?.text) {
        const text = data.responses[0].fullTextAnnotation.text;
        setScanResults(text);
        setEditedResults(text);
      } else {
        console.error("No text found in response:", data);
        throw new Error("No text detected in image");
      }
    } catch (error: any) {
      console.error("Full OCR Error:", error);
      alert(`Scanning failed: ${error.message}`);
    } finally {
      setIsScanning(false);
    }
  }

  function confirmPhoto() {
    if (!photo) return;
    scanReceipt(photo);
  }

  function submitResults() {
    // TODO: Handle submission of edited results
    console.log("Submitting results:", editedResults);
    router.back();
  }

  if (isScanning) {
    return <ScanningView photo={photo!} onBack={() => router.back()} />;
  }

  if (scanResults) {
    return (
      <ResultsView
        onBack={() => router.back()}
        editedResults={editedResults}
        onChangeResults={setEditedResults}
        onRetake={() => {
          setScanResults("");
          setEditedResults("");
          setPhoto(null);
        }}
        onSubmit={submitResults}
      />
    );
  }

  if (photo) {
    return (
      <PhotoPreview
        photo={photo}
        onBack={() => router.back()}
        onRetake={retakePhoto}
        onConfirm={confirmPhoto}
      />
    );
  }

  return (
    <CameraViewComponent
      onBack={() => router.back()}
      onTakePhoto={takePhoto}
      camera={camera}
      setCamera={setCamera}
      flash={flash}
      onToggleFlash={() => setFlash(!flash)}
    />
  );
}
