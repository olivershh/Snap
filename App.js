import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Albums from "./screens/Albums";
import Camera from "./screens/Camera";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={{ flex: 1 }}>Snap</Text>
      <View style={{ flex: 8 }}></View>
      <NavigationContainer style={{ flex: 1 }}>
        <Tab.Navigator>
          {/* <Tab.Screen name="Login" component={Login} /> */}
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Camera" component={Camera} />
          <Tab.Screen name="Albums" component={Albums} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
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
