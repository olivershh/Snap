import {} from "react";
import {View, Text} from "react-native";
import Button from "./Button";
import {storage} from "../firebaseSetup";
import {ref, uploadBytes} from "firebase/storage";

export default function CameraControls({cameraRef, setImage, image}) {
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
        const imageRef = ref(storage, "/photos/image1.jpg");
        const img = await fetch(data.uri);
        const bytes = await img.blob();
        await uploadBytes(imageRef, bytes);
        console.log("photo uploaded");
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
      <Text>film component here</Text>

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
