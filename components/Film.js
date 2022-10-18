import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { updateDoc } from "firebase/firestore";

export default function Film(props) {
  const newFilmHandler = () => {
    if (!props.film.isFilmFull) {
      return;
    }
    const newFilm = {
      name: `Album ${props.film.index + 2}`,
      size: 2,
      photosTaken: 0,
      isFilmFull: false,
      path: `user_${props.email}/albums/`,
      photos: [],
      index: props.film.index + 1,
    };
    const albumProp = `albums.${newFilm.index}`;
    updateDoc(props.docRef, {
      [albumProp]: newFilm,
      currFilm: newFilm.index,
    })
      .then(() => {
        props.setFilm(newFilm);
        console.log("updated database");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
  };
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
          ? `Press here to start a new film`
          : props.film.photosTaken + "/" + props.film.size}
      </Text>
    </View>
  );
}
