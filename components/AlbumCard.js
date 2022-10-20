import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PolaroidStack from "./PolaroidStack";

const AlbumCard = ({ album, albumNumber }) => {
  const navigation = useNavigation();
  const isDeveloped = album.isFilmFull;

  album.albumNumber = albumNumber;

  // Unsure why the touchable opacity does not work on android, so added a button.
  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={
          isDeveloped
            ? () =>
                navigation.navigate("Album", {
                  album: { ...album },
                })
            : () => {
                alert("Film must be complete before its viewable");
              }
        }
      >
        <PolaroidStack photos={album.photos} isFilmFull={album.isFilmFull} />
        <Text style={styles.name}>{album.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 30,

    width: "40%",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    // backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  // container: {
  //   backgroundColor: "red",
  //   borderColor: "#000",
  //   borderWidth: 1,
  // justifyContent: "center",
  //   alignItems: "center",
  // },
  name: {
    textAlign: "center",
    padding: 2,
    backgroundColor: "white",
    opacity: 0.7,
  },
});
