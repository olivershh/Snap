import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import AlbumStack from "./stacks/AlbumStack";
import CameraScreen from "./screens/CameraScreen";
import SinglePhotoScreen from "./screens/SinglePhotoScreen";
import GenerateTreeTest from "./screens/GenerateTreeTest";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const TabNav = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="AlbumStack" component={AlbumStack} />
        <Tab.Screen name="Profile" children={() => <Profile />} />
        <Tab.Screen name="tree" children={() => <GenerateTreeTest />} />
        {/* <Tab.Screen name="TempSingle" component={SinglePhotoScreen} /> */}
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen name="Home" component={TabNav}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
