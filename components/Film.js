import { View, Text } from "react-native";
export default function Film(props) {
  return (
    <View>
      <Text>{props.film.name}</Text>
      <Text>
        {props.film.photosTaken}/{props.film.size}
      </Text>
    </View>
  );
}
