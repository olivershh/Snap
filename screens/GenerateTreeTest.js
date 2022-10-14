import { View, Button } from "react-native";
import React from "react";
import getFileTree from "../util/GetFileTree";
import getJavascriptObject from "../util/getJavascriptObject";

function GenerateTreeTest() {
  return (
    <View>
      <Button
        title="generate file tree"
        onPress={() => getFileTree(true)}
      ></Button>
      <Button
        title="get object from bucket?"
        onPress={() => getJavascriptObject()}
      ></Button>
    </View>
  );
}

export default GenerateTreeTest;
