import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";
import { storage, auth, db } from "../firebaseSetup";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const Caption = ({ photoObj, albumName, index, photosArray, albumNumber }) => {
  const [isEditing, setIsEditing] = useState(false);
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

  function CaptionBox() {
    return photoObj.caption ? (
      <Text>{photoObj.caption}</Text>
    ) : (
      <>
        <Text>Add A comment</Text>
        <Entypo
          name="new-message"
          size={24}
          color="black"
          onPress={() => setIsEditing(true)}
        />
      </>
    );
  }

  function EditBox() {
    function onTextChange(newText) {
      setText(newText);
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

  return (
    <View style={{ flex: 1 }}>
      {isEditing ? <EditBox /> : <CaptionBox />}
      <Text>{photoObj.date}</Text>
    </View>
  );
};

export default Caption;
