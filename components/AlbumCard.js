import { Button, StyleSheet, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const AlbumCard = ({ album }) => {
  const navigation = useNavigation();

  // Unsure why the touchable opacity does not work on android, so added a button.
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Album")}
    >
      <Text style={styles.name}>{album.name}</Text>
      <Button onPress={() => navigation.navigate("Album")} title="Open">
        Go to album
      </Button>
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
