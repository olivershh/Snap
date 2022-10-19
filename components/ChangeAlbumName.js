import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ChangeAlbumName = ({ route }) => {
  //   const currentTitle = route.params.album.name;

  const [currentTitle, setCurrentTitle] = useState(route.params.album.name);
  const [tempTitle, setTempTitle] = useState(currentTitle);
  const [isEditModeOn, setIsEditModeOn] = useState(false);

  console.log(currentTitle);

  const switchToEdit = () => {
    setIsEditModeOn(true);
  };

  const saveNewTitle = () => {
    //Changes title
    setCurrentTitle(tempTitle);

    //Updates DB

    setIsEditModeOn(false);
  };

  if (!isEditModeOn) {
    return (
      <View style={styles.headingBar}>
        <Text style={{ fontSize: 20, width: "92%" }}>{currentTitle}</Text>
        <Entypo
          style={{ flex: 1 }}
          name="new-message"
          size={24}
          color="gray"
          onPress={() => {
            switchToEdit();
          }}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.headingBarInput}>
        {/* Become a text entry */}
        <TextInput
          style={{
            backgroundColor: "ghostwhite",
            fontSize: 20,
            width: "80%",
            textAlign: "center",
          }}
          placeholder="New title..."
          onChangeText={(text) => {
            console.log(text);
            setTempTitle(text);
          }}
          onSubmitEditing={saveNewTitle}
        ></TextInput>
        <MaterialCommunityIcons
          name="check-decagram"
          size={24}
          color="black"
          onPress={() => {
            saveNewTitle();
          }}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headingBar: {
    flexDirection: "row",
    // backgroundColor: "blue",
    width: "95%",
    marginLeft: -30,
    justifyContent: "space-around",
    alignItems: "center",
  },
  headingBarInput: {
    flexDirection: "row",
    width: "95%",
    marginLeft: -30,
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default ChangeAlbumName;
