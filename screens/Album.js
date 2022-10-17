import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import PolaroidCard from "../components/PolaroidCard";

const fakePicObjects = [
  {
    image: require("../fakeImage.jpeg"),
    caption: "caption here",
    date: "1/9/2021",
    id: 1,
  },
  {
    image: require("../fakeImage.jpeg"),
    caption: "another caption here",
    date: "23/1/2001",
    id: 2,
  },
  {
    image: require("../fakeImage.jpeg"),
    caption: "also a caption",
    date: "1/11/2001",
    id: 3,
  },
  {
    image: require("../fakeImage.jpeg"),
    caption: "caption here",
    date: "1/1/2008",
    id: 4,
  },
];

const Album = () => {
  function renderItem({ item }) {
    const { image, caption, date } = item;
    return <PolaroidCard image={image} caption={caption} date={date} />;
  }

  return (
    <ImageBackground
      source={require("../cork.jpeg")}
      style={{ backgroundColor: "gray", flex: 1 }}
    >
      <FlatList
        data={fakePicObjects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ImageBackground>
  );
};

export default Album;

const styles = StyleSheet.create({});
