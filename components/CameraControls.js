import { useEffect, useState } from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

import Button from "./Button";
import { storage, auth, db } from "../firebaseSetup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Film from "./Film";
import * as ImageManipulator from "expo-image-manipulator";

import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function CameraControls({ cameraRef, setImage, image }) {
  const [film, setFilm] = useState(null);
  const [path, setPath] = useState("");
  const email = auth.currentUser?.email;
  const docRef = doc(db, "users", email);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrFilm = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      ///
      const userAlbums = docSnap.data().albums;
      const currFilm = docSnap.data().currFilm;
      setFilm(userAlbums[currFilm]);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getCurrFilm();
  }, []);

  useEffect(() => {
    if (!film) return;
    updateDoc(docRef, {
      "albums.0": film,
    })
      .then(() => {
        console.log("updated database");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  }, [film]);

  const takePicture = async () => {
    console.log("in takepic function");

    setIsLoading(true);

    if (film.photosTaken === film.size) {
      console.log("MAX REACHED");
      return;
    }

    if (cameraRef) {
      try {
        console.log("in camera ref");
        const data = await cameraRef.current.takePictureAsync();
        const crop = await ImageManipulator.manipulateAsync(
          data.uri,
          [
            {
              resize: {
                width: 2000,
                height: 2000,
              },
            },
          ],
          { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );

        const imageRef = ref(
          storage,
          `${film.path + film.name}/${film.photosTaken}`
        );
        const img = await fetch(crop.uri);
        const bytes = await img.blob();
        getDownloadURL(
          ref(
            storage,
            `user_${email}/albums/${film.name}/${film.photosTaken - 1}`
          )
        ).then((url) => {
          setFilm((currFilm) => {
            const newFilm = { ...currFilm };
            newFilm.photos.push({ date: Date.now() });
            newFilm.photosTaken = currFilm.photosTaken + 1;
            newFilm.photos[film.photos.length - 1].URL = url;

            return newFilm;
          });
        });

        uploadBytes(imageRef, bytes).then(() => {
          setImage(crop.uri);
          console.log(
            "photo uploaded: ",
            `/user_${auth.currentUser?.email}/albums/${film.name}/${film.photosTaken}`
          );

          setIsLoading(false);
        });
      } catch (e) {
        setIsLoading(false);
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
        <Film film={film ? film : { name: "", size: 0, photosTaken: 0 }} />
      </View>

      <View style={[styles.cameraButtonsContainer, { backgroundColor: "red" }]}>
        {!image ? (
          isLoading ? (
            <Text>This is loading</Text>
          ) : (
            <MaterialIcons
              name="photo-camera"
              size={60}
              color="black"
              onPress={takePicture}
            />
          )
        ) : (
          <>
            <Entypo name="back" size={24} color="black" onPress={resetImage} />
            <Text>Back to camera</Text>
          </>
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
