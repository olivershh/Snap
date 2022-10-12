import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Albums from "./screens/Albums";
import CameraScreen from "./screens/CameraScreen";
import SinglePhotoScreen from "./screens/SinglePhotoScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const TabNav = () => {
    return (
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Camera" component={CameraScreen} />
        <Tab.Screen name="Albums" component={Albums} />
        <Tab.Screen name="Profile" children={() => <Profile />} />
        <Tab.Screen name="TempSingle" component={SinglePhotoScreen} />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer style={{ flex: 1 }}>
      <Stack.Navigator>
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
