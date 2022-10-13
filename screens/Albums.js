import { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AlbumCard from "../components/AlbumCard";
import { AlbumContext } from "../context/AlbumContext";

export default function Albums() {
  const { albums } = useContext(AlbumContext)

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ backgroundColor: '#fff' }}
    >
      <View style={styles.albumsList}>
        {albums.map((album) => (
          <AlbumCard album={album} key={album.date} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '10%'
  },
  albumsList: {
    flex: 1
  }
});
