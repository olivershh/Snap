import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { storage, auth, db } from "../firebaseSetup";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useFonts } from "expo-font";

const Caption = ({ photoObj, albumName, index, photosArray, albumNumber }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [loaded] = useFonts({
    Handlee: require("../assets/fonts/Handlee-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  function CaptionBox() {
    return photoObj.caption ? (
      <Text style={{ fontFamily: "Handlee", fontSize: 24 }}>
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
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            backgroundColor: "ghostwhite",
            fontFamily: "Handlee",
            fontSize: 24,
            textAlign: "center",
          }}
          maxLength={35}
          onChangeText={(newText) => setText(newText)}
          value={text}
          onSubmitEditing={handleCommentSubmit}
        ></TextInput>
      </View>
    );
  }

  const date = new Date(photoObj.date);
  const localDate = date.toLocaleDateString("en-US");

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {isEditing ? <EditBox /> : <CaptionBox />}
      </View>
      <View
        style={{
          margin: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "Handlee",
            fontSize: 16,
            textAlign: "center",
          }}
        >
          {localDate}
        </Text>
      </View>
    </View>
  );
};

export default Caption;
