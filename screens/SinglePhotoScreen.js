import { Text, StyleSheet, Image, SafeAreaView, View } from "react-native";
import PolaroidCard from "../components/PolaroidCard";

export default function SinglePhotoScreen() {
  return (
    <View style={{ flex: 1 }}>
      <PolaroidCard />
    </View>
  );
}

const styles = StyleSheet.create({
  imageOverlay: { fontSize: 60 },
  image: {
    aspectRatio: 1,
  },
});
