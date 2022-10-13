import { View, Image, Text, StyleSheet, SafeAreaView } from "react-native";

export default function PolaroidCard(
  { image, caption, date },
  randomizeAngle = false
) {
  function randomRotation() {
    return Math.random() * 8 - 4 + "deg";
  }

  const rotation = randomRotation();

  console.log(rotation);

  return (
    <View
      style={[
        styles.container,
        { transform: [{ rotateX: rotation }, { rotateZ: rotation }] },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image}></Image>
      </View>
      <View style={styles.textContainer}>
        <Text>{caption}</Text>
        <Text>{`- ${date}`}</Text>
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
