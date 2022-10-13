import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AlbumProvider } from "../context/AlbumContext";
import AddAlbum from "../screens/AddAlbum";
import Album from "../screens/Album";
import Albums from "../screens/Albums";

const Stack = createNativeStackNavigator();

export default AlbumStack = ({ navigation }) => {
  return (
    <AlbumProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Albums"
          component={Albums}
          options={{
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Add Album")}
              >
                <Text>+</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen name="Album" component={Album} />
        <Stack.Screen name="Add Album" component={AddAlbum} />
      </Stack.Navigator>
    </AlbumProvider>
  );
};
