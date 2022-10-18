import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { storage, auth, db } from "../firebaseSetup";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFonts } from "expo-font";

const Caption = ({ photoObj, albumName, index, photosArray, albumNumber }) => {
  const [isEditing, setIsEditing] = useState(false);

  function CaptionBox() {
    return photoObj.caption ? (
      <Text style={{ fontFamily: "RockSalt", fontSize: 16, flexWrap: "wrap" }}>
        {photoObj.caption}
      </Text>
    ) : (
      <>
        <Text style={{ color: "gray" }}>add a caption...</Text>
        <Entypo
          name="new-message"
          size={24}
          color="gray"
          onPress={() => setIsEditing(true)}
        />
      </>
    );
  }

  function EditBox() {
    const [text, setText] = useState("");

    async function handleCommentSubmit() {
      photoObj.caption = text;
      setIsEditing(false);

      const email = await auth.currentUser?.email;
      const docRef = await doc(db, "users", email);
      const docSnap = await getDoc(docRef);
      const docSnapData = await docSnap.data();

      docSnapData.albums[albumNumber].photos[index].caption = text;

      try {
        updateDoc(docRef, docSnapData);
      } catch (e) {
        console.log(e);
      }
    }

    return (
      <View>
        <TextInput
          onChangeText={(newText) => setText(newText)}
          value={text}
        ></TextInput>
        <Button title="submit" onPress={handleCommentSubmit}></Button>
      </View>
    );
  }

  const date = new Date(photoObj.date);
  const localDate = date.toLocaleDateString("en-US");

  const [loaded] = useFonts({
    RockSalt: require("../assets/fonts/RockSalt-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ flex: 1, alignItems: "center" }}>
        {isEditing ? <EditBox /> : <CaptionBox />}
      </View>
      <View
        style={{
          margin: 10,
        }}
      >
        <Text>{localDate}</Text>
      </View>
    </View>
  );
};

export default Caption;
