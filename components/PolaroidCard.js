import { View, Image, StyleSheet } from "react-native";
import Caption from "./Caption";

export default function PolaroidCard({
  photoObj,
  index,
  albumName,
  photosArray,
  albumNumber,
}) {
  function randomRotation() {
    const angle = Math.random() * 4 + "deg";

    if (index % 2) {
      return angle;
    }
    return "-" + angle;
  }

  const rotation = randomRotation();

  return (
    <View
      style={[
        styles.container,
        { transform: [{ rotateX: rotation }, { rotateZ: rotation }] },
      ]}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: photoObj.URL }} style={styles.image}></Image>
      </View>
      <View style={styles.textContainer}>
        <Caption
          photoObj={photoObj}
          index={index}
          albumName={albumName}
          photosArray={photosArray}
          albumNumber={albumNumber}
        />
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
  image: { width: "100%", aspectRatio: 1 },
});
