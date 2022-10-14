import React, { useState, useEffect, useRef } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CameraView from "../components/CameraView";
import CameraControls from "../components/CameraControls";
import CameraImageTaken from "../components/CameraImageTaken";

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);

  return (
    <ImageBackground
      style={{ padding: 15, backgroundColor: "lightgray", flex: 1 }}
    >
      <View style={{ padding: 15, backgroundColor: "white" }}>
        {!image ? (
          <CameraView cameraRef={cameraRef} />
        ) : (
          <CameraImageTaken image={image} />
        )}
      </View>

      <CameraControls cameraRef={cameraRef} setImage={setImage} image={image} />
    </ImageBackground>
  );
}
