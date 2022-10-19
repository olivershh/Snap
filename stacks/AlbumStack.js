import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { AlbumProvider } from "../context/AlbumContext";
import AddAlbum from "../screens/AddAlbum";
import Album from "../screens/Album";
import Albums from "../screens/Albums";
import { Entypo } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

export default AlbumStack = ({ navigation }) => {
  return (
    <AlbumProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Albums"
          component={Albums}
          // options={{
          //   headerRight: () => (
          //     <TouchableOpacity
          //       onPress={() => navigation.navigate("Add Album")}
          //     >
          //       <Text>+</Text>
          //     </TouchableOpacity>
          //   ),
          // }}
        />
        <Stack.Screen
          name="Album"
          component={Album}
          options={({ route }) => ({
            title: route.params.album.name,
            headerTransparent: false,
          })}
        />
        {/* <Stack.Screen name="Add Album" component={AddAlbum} /> */}
      </Stack.Navigator>
    </AlbumProvider>
  );
};
