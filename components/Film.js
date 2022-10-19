import { View, Text } from "react-native";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
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
    <View style={{ alignItems: "center", padding: 10 }}>
      <Text style={{ fontSize: "14%", fontWeight: "bold" }}>{props.film.name}</Text>
      {!props.film.isFilmFull
        ? <MaterialCommunityIcons
          name="film"
          size={"70%"}
          color="black"

        /> : <>

          <Entypo
            name="circle-with-plus"
            size={"50%"}
            color="black"
            onPress={newFilmHandler}
          />
        </>}

      <Text style={{ fontSize: "14%", fontWeight: "bold" }}>
        {props.film.isFilmFull
          ? `New Film`
          : props.film.photosTaken + "/" + props.film.size}
      </Text>
    </View>
  );
}
