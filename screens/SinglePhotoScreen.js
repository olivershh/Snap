import { Text, StyleSheet, Image, SafeAreaView, View } from "react-native";
import PolaroidCard from "../components/PolaroidCard";

//may be redundant

export default function SinglePhotoScreen() {
  const image = require("../fakeImage.jpeg");

  console.log("rendering album page");

  return (
    <View style={{ flex: 1 }}>
      <PolaroidCard image={image} />
    </View>
  );
}

const styles = StyleSheet.create({
  imageOverlay: { fontSize: 60 },
  image: {
    aspectRatio: 1,
  },
});
