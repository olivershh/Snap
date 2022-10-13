import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PolaroidCard from "../components/PolaroidCard";

const fakePicObjects = [
  {
    image: require("../fakeImage.jpeg"),
    caption: "caption here",
    date: "1/1/2001",
    id: 1,
  },
  {
    image: require("../fakeImage.jpeg"),
    caption: "caption here",
    date: "1/1/2001",
    id: 2,
  },
  {
    image: require("../fakeImage.jpeg"),
    caption: "caption here",
    date: "1/1/2001",
    id: 3,
  },
  {
    image: require("../fakeImage.jpeg"),
    caption: "caption here",
    date: "1/1/2001",
    id: 4,
  },
];

const Album = () => {
  function renderItem({ item }) {
    const { image, caption, date } = item;
    return <PolaroidCard image={image} caption={caption} date={date} />;
  }

  return (
    <View>
      <FlatList
        data={fakePicObjects}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Album;

const styles = StyleSheet.create({});
