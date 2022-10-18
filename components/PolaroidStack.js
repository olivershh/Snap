import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

export default function PolaroidStack({ photos }) {
  function randomRotation() {
    const angle = Math.random() * 4 + "deg";

    return angle;
  }

  function SinglePolaroid({ marginTop }) {
    const rotation = randomRotation();

    return (
      <View
        style={[
          styles.container,
          {
            transform: [{ rotateX: rotation }, { rotateZ: rotation }],
          },
        ]}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: photos[0].URL }} style={styles.image}></Image>
        </View>
        <View style={styles.textContainer}></View>
      </View>
    );
  }

  return (
    <View>
      <SinglePolaroid />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 155,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 15,
  },
  imageContainer: { padding: 4 },
  textContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 100,
  },
  image: { width: "100%", aspectRatio: 1 },
});
