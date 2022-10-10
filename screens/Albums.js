import { useState } from "react";
import { Button, View, StyleSheet, Text } from "react-native";

export default function Albums() {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <View style={[styles.container, isPressed && { backgroundColor: "blue" }]}>
      <Text>Album page</Text>
      <Button
        title="Albums"
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
