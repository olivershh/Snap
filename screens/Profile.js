import { useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";

export default function Profile({ setHasUser }) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={[styles.container, isPressed && { backgroundColor: "blue" }]}>
      <Text>Profile page</Text>
      <Button
        title="Logout"
        onPress={() => {
          setIsPressed(!isPressed);
          setHasUser(false);
        }}
      />
    </View>
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
