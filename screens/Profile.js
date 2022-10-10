import { useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";

export default function Profile() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={[styles.container, isPressed && { backgroundColor: "blue" }]}>
      <Text>Profile page</Text>
      <Button
        title="Profile"
        onPress={() => {
          setIsPressed(!isPressed);
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
