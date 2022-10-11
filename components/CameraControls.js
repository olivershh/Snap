import {} from "react";
import { View, Text } from "react-native";
import Button from "./Button";

export default function CameraControls({ cameraRef, setImage }) {
  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };
  return (
    <View>
      <View>
        <Text>FILM HERE</Text>
      </View>
      <Button
        title="Take a picture"
        icon="camera"
        onPress={takePicture}
        color="blue"
      />
      <Text>FILM HERE</Text>
    </View>
  );
}
