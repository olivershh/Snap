import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Albums from "./screens/Albums";
import CameraScreen from "./screens/CameraScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  const [hasUser, setHasUser] = useState(false);

  if (!hasUser) {
    return <Login hasUser={hasUser} setHasUser={setHasUser} />;
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer style={{ flex: 1 }}>
          <Tab.Navigator>
            <Tab.Screen name="Camera" component={CameraScreen} />
            <Tab.Screen name="Albums" component={Albums} />
            <Tab.Screen
              name="Profile"
              children={() => <Profile setHasUser={setHasUser} />}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
