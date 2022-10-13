import {useState} from "react";
import {View, Text} from "react-native";
import Button from "./Button";
import {storage, auth} from "../firebaseSetup";
import {ref, uploadBytes} from "firebase/storage";
import Film from "./Film";

export default function CameraControls({cameraRef, setImage, image}) {
  const [film, setFilm] = useState({name: "Album 1", photosTaken: 0, size: 20});
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
        setFilm((currFilm) => {
          const newFilm = {...currFilm};
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
        const img = await fetch(data.uri);
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
      style={{backgroundColor: "white", flex: 1, marginTop: 20, padding: 15}}
    >
      <Film film={film} />

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
