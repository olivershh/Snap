import 'react-native-gesture-handler'
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import AlbumStack from './stacks/AlbumStack';
import CameraScreen from "./screens/CameraScreen";
import SinglePhotoScreen from "./screens/SinglePhotoScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
  const TabNav = () => {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer style={{ flex: 1 }}>
          <Tab.Navigator>
            <Tab.Screen name="Camera" component={CameraScreen} />
            <Tab.Screen name="Album Stack" component={AlbumStack} options={{ headerShown: false }} />
            <Tab.Screen
              name="Profile"
              children={() => <Profile setHasUser={setHasUser} />}
            />
            <Tab.Screen name="TempSingle" component={SinglePhotoScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>

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
