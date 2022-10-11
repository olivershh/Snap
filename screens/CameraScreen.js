import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import Button from "../components/Button";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CameraScreen() {
  // const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        alert("picture is saved!");
        setImage(null);
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {!image ? (
          <View
            style={{
              width: windowWidth * 0.9,
              height: windowWidth * 0.9,
              padding: 10,
            }}
          >
            <Camera
              style={styles.camera}
              type={type}
              flashMode={flash}
              ref={cameraRef}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 30,
                }}
              >
                <Button
                  icon={"retweet"}
                  onPress={() => {
                    setType(
                      type === CameraType.back
                        ? CameraType.front
                        : CameraType.back
                    );
                  }}
                />
                <Button
                  icon={"flash"}
                  color={
                    flash === Camera.Constants.FlashMode.off
                      ? "gray"
                      : "#f1f1f1"
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
          </View>
        ) : (
          <Image source={{ uri: image }} style={styles.camera} />
        )}
        <View style={styles.cameraControls}>
          {image ? (
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 50,
              }}
            >
              <Button
                title={"Re-take"}
                icon="retweet"
                onPress={() => {
                  setImage(null);
                }}
              />
              <Button title={"save"} icon="check" onPress={saveImage} />
            </View>
          ) : (
            <Button
              title={"Take a picture"}
              icon="camera"
              onPress={takePicture}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    // margin: 15,
  },
  camera: { flex: 1 },
  cameraControls: {
    alignItems: "center",
    backgroundColor: "black",
  },
});
