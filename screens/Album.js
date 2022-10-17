import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import PolaroidCard from "../components/PolaroidCard";

const Album = ({ route, navigation }) => {
  const photosArray = route.params.album.photos;

  console.log(photosArray);

  function renderItem({ item }) {
    return <PolaroidCard url={item.URL} caption="" date={item.date} />;
  }

  return (
    <ImageBackground
      source={require("../cork.jpeg")}
      style={{ backgroundColor: "gray", flex: 1 }}
    >
      <FlatList
        data={photosArray}
        renderItem={renderItem}
        keyExtractor={(item) => item.URL}
      />
    </ImageBackground>
  );
};

export default Album;

const styles = StyleSheet.create({});
