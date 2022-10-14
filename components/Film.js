import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Film(props) {
  console.log(props.film.name);
  return (
    <View style={{ alignItems: "center" }}>
      <Text>{props.film.name}</Text>
      <MaterialCommunityIcons name="film" size={60} color="black" />
      <Text>
        {props.film.photosTaken}/{props.film.size}
      </Text>
    </View>
  );
}
