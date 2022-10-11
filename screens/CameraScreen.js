import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import Button from "../components/Button";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CameraView from "../components/CameraView";
import CameraControls from "../components/CameraControls";
const windowWidth = Dimensions.get("window").width;

export default function CameraScreen() {
  // const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {!image ? (
          <View style={styles.cameraContainer}>
            <CameraView cameraRef={cameraRef} />
          </View>
        ) : (
          <View style={styles.cameraContainer}>
            <Image source={{ uri: image }} style={styles.camera} />
          </View>
        )}
        <View>
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
                title="Re-take"
                icon="retweet"
                onPress={() => {
                  setImage(null);
                }}
              />
            </View>
          ) : (
            <CameraControls cameraRef={cameraRef} setImage={setImage} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
