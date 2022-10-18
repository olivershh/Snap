import { View, Text } from "react-native";
import React from "react";

const HasCaption = ({ photoObj }) => {
  return (
    <View>
      <Text>{photoObj.caption}</Text>
    </View>
  );
};

export default HasCaption;
