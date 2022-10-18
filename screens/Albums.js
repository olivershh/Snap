import { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AlbumCard from "../components/AlbumCard";
import { AlbumContext } from "../context/AlbumContext";
import { storage, auth, db } from "../firebaseSetup";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

export default function Albums() {
  const email = auth.currentUser?.email;
  const docRef = doc(db, "users", email);
  const [albums, setAlbums] = useState([]);

  const isFocused = useIsFocused();

  const getData = async () => {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      ///
      const userAlbums = docSnap.data().albums;
      const returnArray = [];

      Object.keys(userAlbums).map((albumIndex) => {
        returnArray.push([userAlbums[albumIndex], albumIndex]);
      });

      setAlbums(returnArray);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (isFocused) {
      getData();
      console.log("using useffect");
    }
  }, [isFocused]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: "#fff" }}
    >
      <View style={styles.albumsList}>
        {albums
          .sort(function (a, b) {
            return a.isFilmFull - b.isFilmFull;
          })
          .map((album) => (
            <AlbumCard
              album={album[0]}
              albumNumber={album[1]}
              key={album[0].name}
            />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "10%",
  },
  albumsList: {
    flex: 1,
  },
});
