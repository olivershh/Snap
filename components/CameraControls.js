import {} from "react";
import { View, Text } from "react-native";
import Button from "./Button";

export default function CameraControls({ cameraRef, setImage, image }) {
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        setImage(data.uri);
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
