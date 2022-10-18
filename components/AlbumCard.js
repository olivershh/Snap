import { Button, StyleSheet, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AlbumCard = ({ album, albumNumber }) => {
  const navigation = useNavigation();
  const isDeveloped = album.isFilmFull;

  album.albumNumber = albumNumber;

  // Unsure why the touchable opacity does not work on android, so added a button.
  return (
    <TouchableOpacity
      style={[styles.card, !isDeveloped && { backgroundColor: "red" }]}
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
      <Text style={styles.name}>{album.name}</Text>
    </TouchableOpacity>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  card: { paddingVertical: 20 },
  container: {
    borderColor: "#000",
    borderWidth: 1,
    width: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    textAlign: "center",
  },
});
