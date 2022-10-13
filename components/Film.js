import {View, Text} from "react-native";
export default function Film(props) {
  console.log(props.film.name);
  return (
    <View>
      <Text>{props.film.name}</Text>
      <Text>
        {props.film.photosTaken}/{props.film.size}
      </Text>
    </View>
  );
}
