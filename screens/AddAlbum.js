import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { TouchableOpacity } from "react-native";
import { AlbumContext } from "../context/AlbumContext";
import { useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebaseSetup";
import { doc, getDoc, updateDoc } from "firebase/firestore";

// const addAlbum = async (name) => {
//   console.log("in addAlbum");
//   console.log("in addAlbum 2");
//   console.log(auth);

//   const email = auth.currentUser?.email;
//   console.log(email);
//   const docRef = doc(db, "users", email);
//   // console.log(docRef);
//   const docSnap = await getDoc(docRef);
//   // console.log(docSnap);

//   if (docSnap.exists()) {
//     const userAlbums = docSnap.data().albums;
//     console.log(userAlbums);
//   } else {
//     console.log("No such document!");
//   }
//   console.log(userAlbums);

//   const path = `user_${email}/albums/`;
//   const newAlbum = {
//     name,
//     isFilmFull: false,
//     path,
//     photos: [],
//     photosTaken: 0,
//     size: 6,
//   };
//   //Push to database
// };

const AddAlbum = () => {
  const [name, setName] = useState("");
  const now = Date.now();
  // const { addAlbum } = useContext(AlbumContext);
  const navigation = useNavigation();

  return (
    <View>
      <Text style={styles.title}>Album name:</Text>
      <TextInput
        onChangeText={setName}
        value={name}
        style={styles.input}
        placeholder="Enter Album name..."
        placeholderTextColor="#555"
      />
      <TouchableOpacity
        onPress={() => {
          addAlbum(name)
            .then(() => {
              console.log("Did the addAlbum");
            })
            .catch((err) => err);
          navigation.goBack();
        }}
        disabled={name === ""}
        style={styles.buttonContainer}
      >
        <Text style={{ color: "#fff", textAlign: "center", padding: 20 }}>
          Add Album
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddAlbum;

const styles = StyleSheet.create({
  input: {
    padding: 10,
    backgroundColor: "#ddd",
    marginVertical: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 20,
    margin: 10,
  },
  buttonContainer: {
    backgroundColor: "green",
    marginVertical: 20,
    marginHorizontal: 10,
  },
});
