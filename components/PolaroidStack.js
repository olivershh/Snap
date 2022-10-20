import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function PolaroidStack({ isFilmFull, photos }) {
  console.log(photos);
  function randomRotation() {
    const angle = Math.random() * 4 + "deg";

    return angle;
  }

  return (
    <View
      style={{
        // backgroundColor: "rgba(255, 255, 255, 0.5)",
        padding: 15,
        paddingBottom: 10,
      }}
    >
      {!isFilmFull ? (
        <Image
          source={require("../spiralalbumred.png")}
          style={{ width: 100, height: 120 }}
        ></Image>
      ) : (
        <Image
          source={require("../spiralalbumblue.png")}
          style={{ width: 100, height: 120 }}
        ></Image>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 130,
    marginBottom: 15,
  },
  imageContainer: {
    padding: 4,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 100,
  },
  image: { width: "100%", aspectRatio: 1 },
});
