import { StyleSheet, Text, ImageBackground, View } from "react-native";
import { BlurView } from "expo-blur";

export default function CameraImageTaken({ image }) {
  return (
    <ImageBackground source={{ uri: image }} style={styles.image}>
      <Text style={styles.imageOverlay}>?</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageOverlay: { fontSize: 60 },
  image: {
    aspectRatio: 1,
  },
});
