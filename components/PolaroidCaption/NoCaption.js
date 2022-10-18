import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { MaterialIcons, Entypo } from "@expo/vector-icons";

const NoCaption = ({ photoObj }) => {
  const [editing, setEditing] = useState(false);

  return (
    <View
      style={{ width: "90%", alignItems: "center", justifyContent: "center" }}
    >
      {!editing ? (
        <>
          <Text>Add a caption</Text>
          <Entypo
            name="new-message"
            size={24}
            color="black"
            onPress={() => setEditing(true)}
          />
        </>
      ) : (
        <TextInput>Enter a comment...</TextInput>
      )}
    </View>
  );
};

export default NoCaption;
