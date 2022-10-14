import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Button from "./Button";
import { storage, auth } from "../firebaseSetup";
import { ref, uploadBytes } from "firebase/storage";
import Film from "./Film";
import * as ImageManipulator from "expo-image-manipulator";

export default function CameraControls({ cameraRef, setImage, image }) {
  const [film, setFilm] = useState({
    name: "Album 1",
    photosTaken: 0,
    size: 20,
  });

  const takePicture = async () => {
    console.log("in takepic function");

    if (film.photosTaken === film.size) {
      console.log("MAX REACHED");
      return;
    }

    if (cameraRef) {
      try {
        console.log("in camera ref");
        const crop = await cameraRef.current.takePictureAsync();
        // const crop = await ImageManipulator.manipulateAsync(
        //   data.uri,
        //   [
        //     {
        //       resize: {
        //         width: 2000,
        //         height: 2000,
        //       },
        //     },
        //   ],
        //   { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        // );
        setImage(crop.uri);
        setFilm((currFilm) => {
          const newFilm = { ...currFilm };
          newFilm.photosTaken = currFilm.photosTaken + 1;
          return newFilm;
        });
        console.log(
          "in the process: ",
          `/user_${auth.currentUser?.email}/albums/${film.name}/${film.photosTaken}`
        );
        const imageRef = ref(
          storage,
          `/user_${auth.currentUser?.email}/albums/${film.name}/${film.photosTaken}`
        );
        const img = await fetch(crop.uri);
        const bytes = await img.blob();
        await uploadBytes(imageRef, bytes);
        console.log(
          "photo uploaded: ",
          `/user_${auth.currentUser?.email}/albums/${film.name}/${film.photosTaken}`
        );
      } catch (e) {
        console.log(e);
      }
    }
  };

  const resetImage = () => {
    setImage(null);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        marginTop: 20,
        padding: 15,
        flex: 1,
        flexDirection: "row",
      }}
    >
      <View
        style={[
          styles.cameraButtonsContainer,
          { backgroundColor: "gold", marginRight: 15 },
        ]}
      >
        <Film film={film} />
      </View>

      <View style={[styles.cameraButtonsContainer, { backgroundColor: "red" }]}>
        {!image ? (
          <Button
            title="Take a picture"
            icon="camera"
            onPress={takePicture}
            color="blue"
          />
        ) : (
          <Button
            title="Return to camera"
            icon="retweet"
            onPress={resetImage}
            color="blue"
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraButtonsContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
});
