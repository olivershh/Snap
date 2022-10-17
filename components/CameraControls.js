import { useEffect, useState } from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

import Button from "./Button";
import { storage, auth, db } from "../firebaseSetup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Film from "./Film";
import * as ImageManipulator from "expo-image-manipulator";

import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

export default function CameraControls({ cameraRef, setImage, image }) {
  const [film, setFilm] = useState(null);
  const email = auth.currentUser?.email;
  const docRef = doc(db, "users", email);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrFilm = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      ///
      const userAlbums = docSnap.data().albums;
      const currFilm = docSnap.data().currFilm;
      setFilm(() => {
        const newFilm = userAlbums[currFilm];
        newFilm.index = currFilm;
        return newFilm;
      });
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
    const photosTakenProp = `albums.${film.index}.photosTaken`;
    const photosProp = `albums.${film.index}.photos`;
    const isFilmFullProp = `albums.${film.index}.isFilmFull`;
    updateDoc(docRef, {
      [photosTakenProp]: film.photosTaken,
      [photosProp]: arrayUnion(film.photos[film.photos.length - 1]),
      [isFilmFullProp]: film.isFilmFull,
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

    if (cameraRef) {
      try {
        console.log("in camera ref");
        const data = await cameraRef.current.takePictureAsync();
        const crop = await ImageManipulator.manipulateAsync(
          data.uri,
          [
            {
              resize: {
                width: 600,
                height: 600,
              },
            },
          ]
          // { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );

        const imageRef = ref(
          storage,
          `${film.path + film.name}/${film.photosTaken}`
        );
        const img = await fetch(crop.uri);
        const bytes = await img.blob();
        uploadBytes(imageRef, bytes)
          .then(() => {
            setImage(crop.uri);
            console.log(
              "photo uploaded: ",
              `/user_${auth.currentUser?.email}/albums/${film.name}/${film.photosTaken}`
            );

            setIsLoading(false);
            return getDownloadURL(
              ref(
                storage,
                `user_${email}/albums/${film.name}/${film.photosTaken}`
              )
            );
          })
          .then((url) => {
            setFilm((currFilm) => {
              const newFilm = { ...currFilm };
              newFilm.photos.push({ date: Date.now(), URL: url });
              newFilm.photosTaken = currFilm.photosTaken + 1;
              if (newFilm.photosTaken >= newFilm.size) {
                newFilm.isFilmFull = true;
              }

              return newFilm;
            });
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
        <Film
          film={
            film
              ? film
              : { name: "", size: 0, photosTaken: 0, isFilmFull: false }
          }
        />
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
