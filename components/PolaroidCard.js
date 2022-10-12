import { View, Image, Text, StyleSheet, SafeAreaView } from "react-native";

export default function PolaroidCard() {
  function randomRotation() {
    return Math.random() * 10 - 5 + "deg";
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../fakeImage.jpeg")}
          style={styles.image}
        ></Image>
      </View>
      <View style={styles.textContainer}>
        <Text>"Caption would go here! Probably change the font"</Text>
        <Text>-20/12/21</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    width: "95%",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  imageContainer: { padding: 15 },
  textContainer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 100,
  },
  image: { width: "100%" },
});
