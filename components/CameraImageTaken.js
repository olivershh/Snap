import { StyleSheet, Text, ImageBackground, View } from "react-native";
import { BlurView } from "expo-blur";

export default function CameraImageTaken({ image }) {
  return (
    <ImageBackground
      // source={require("../mysteryphoto2.png")}
      source={{ uri: image }}
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
