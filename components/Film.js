import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Film(props) {
  const newFilmHandler = () => {};
  return (
    <View style={{ alignItems: "center" }}>
      <Text>{props.film.name}</Text>
      <MaterialCommunityIcons
        name="film"
        size={60}
        color="black"
        onPress={newFilmHandler}
      />

      <Text>
        {props.film.isFilmFull
          ? "Press here to start a new film"
          : props.film.photosTaken + "/" + props.film.size}
      </Text>
    </View>
  );
}
