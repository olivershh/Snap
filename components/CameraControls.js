import { useEffect, useState } from "react";
import { View } from "react-native";
import Button from "./Button";
import { storage, auth, db } from "../firebaseSetup";
import { ref, uploadBytes } from "firebase/storage";
import Film from "./Film";
import * as ImageManipulator from "expo-image-manipulator";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function CameraControls({ cameraRef, setImage, image }) {
  const [film, setFilm] = useState(null);
  const [path, setPath] = useState("");
  const email = auth.currentUser?.email;
  const docRef = doc(db, "users", email);

  const getCurrFilm = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
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
    if (film) {
      console.log("updated database");
      console.log(film);
      updateDoc(docRef, {
        "albums.0": film,
      });
    }
  }, [film]);

  const takePicture = async () => {
    console.log("pressed");
    if (cameraRef) {
      try {
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
        setImage(crop.uri);

        console.log(
          "in the process: ",
          `${film.path + film.name}/${film.photosTaken}`
        );
        const imageRef = ref(
          storage,
          `${film.path + film.name}/${film.photosTaken}`
        );
        const img = await fetch(crop.uri);
        const bytes = await img.blob();
        await uploadBytes(imageRef, bytes);
        console.log(
          "photo uploaded: ",
          `${film.path + film.name}/${film.photosTaken}`
        );

        setFilm((currFilm) => {
          const newFilm = { ...currFilm };
          newFilm.photos.push({ date: Date.now() });
          newFilm.photosTaken = currFilm.photosTaken + 1;
          console.log(newFilm);
          return newFilm;
        });
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
      style={{ backgroundColor: "white", flex: 1, marginTop: 20, padding: 15 }}
    >
      <Film
        film={film ? film : { photosTaken: 0, size: 20, name: "album_1" }}
      />

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
  );
}
