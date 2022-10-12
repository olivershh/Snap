import 'react-native-gesture-handler'
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import Login from "./screens/Login";
import Profile from "./screens/Profile";
import Camera from "./screens/Camera";
import AlbumStack from './stacks/AlbumStack';

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
            <Tab.Screen name="Camera" component={Camera} />
            <Tab.Screen name="Album Stack" component={AlbumStack} options={{ headerShown: false }} />
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
