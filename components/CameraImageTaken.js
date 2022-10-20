import { StyleSheet, Text, ImageBackground, View } from "react-native";
import { BlurView } from "expo-blur";

export default function CameraImageTaken({ image }) {
  console.log("in image taken");
  return (
    <ImageBackground
      source={require("../mysteryphoto.png")}
      style={styles.image}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageOverlay: { fontSize: 60 },
  image: {
    aspectRatio: 1,
  },
});
