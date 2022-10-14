import { View, Button } from "react-native";
import React from "react";
import getFileTree from "../util/GetFileTree";

function GenerateTreeTest() {
  return (
    <View>
      <Button
        title="generate file tree"
        onPress={() => getFileTree(true)}
      ></Button>
    </View>
  );
}

export default GenerateTreeTest;
