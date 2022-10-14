import { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Camera, CameraType } from "expo-camera";
import Button from "./Button";

import { useIsFocused } from "@react-navigation/native";

export default function CameraView({ cameraRef }) {
  const isFocused = useIsFocused();

  const [type, setType] = useState(Camera.Constants.Type.back);
  // const [permission, requestPermission] = Camera.useCameraPermissions();
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  if (isFocused) {
    return (
      <Camera
        style={styles.image}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >
        <View style={styles.inViewButtons}>
          <Button
            icon="retweet"
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}
          />
          <Button
            icon="flash"
            color={
              flash === Camera.Constants.FlashMode.off ? "gray" : "#f1f1f1"
            }
            onPress={() => {
              setFlash(
                flash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.on
                  : Camera.Constants.FlashMode.off
              );
            }}
          />
        </View>
      </Camera>
    );
  } else {
    return <Text>oops </Text>;
  }
}

const styles = StyleSheet.create({
  inViewButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  image: {
    aspectRatio: 1,
  },
});
