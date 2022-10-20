import React, { useState, useEffect, useRef } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CameraView from "../components/CameraView";
import CameraControls from "../components/CameraControls";
import CameraImageTaken from "../components/CameraImageTaken";
import colorMain from "../assets/colors/colorMain";

export default function CameraScreen() {
  const cameraRef = useRef(null);
  const [image, setImage] = useState(null);

  return (
    <ImageBackground
      // source={require("../potentialBG/7.jpg")}
      style={{ flex: 1, backgroundColor: colorMain }}
    >
      <ImageBackground
        // source={require("../potentialBG/doodleswhite.png")}
        source={require("../potentialBG/10doodles.png")}
        // source={require("../potentialBG/7.jpg")}
        // resizeMode="repeat"
        style={{
          padding: 35,
          flex: 1,
        }}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <ImageBackground
            // source={require("../orange-background2.jpg")}
            style={{
              padding: 20,
              paddingBottom: 0,
              backgroundColor: "white",
              borderStyle: "solid",
              borderColor: "black",
              borderWidth: 3,
              borderBottomColor: "white",
            }}
          >
            {!image ? (
              <CameraView cameraRef={cameraRef} />
            ) : (
              <CameraImageTaken image={image} />
            )}
          </ImageBackground>

          <CameraControls
            cameraRef={cameraRef}
            setImage={setImage}
            image={image}
          />
        </View>
      </ImageBackground>
    </ImageBackground>
  );
}
