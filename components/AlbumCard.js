import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Use, Image } from "react-native-svg";

const AlbumCard = ({ album, albumNumber }) => {
  const navigation = useNavigation();
  const isDeveloped = album.isFilmFull;

  album.albumNumber = albumNumber;

  // Unsure why the touchable opacity does not work on android, so added a button.
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={{ margin: 15, padding: 15, backgroundColor: "red" }}
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
    </View>
  );
};

export default AlbumCard;

const styles = StyleSheet.create({
  card: {
    paddingVertical: 20,

    width: "50%",
    marginVertical: 5,
    alignContent: "center",
    justifyContent: "center",
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
  },
});
