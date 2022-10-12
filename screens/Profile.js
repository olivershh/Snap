import { useState } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseSetup";
import { useNavigation } from "@react-navigation/native";

function Profile() {
  const navigation = useNavigation();

  const handleSignOut = () => {
    console.log("attempt to sign out");
    signOut(auth)
      .then(() => {
        console.log("signed out");
        navigation.navigate("Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          handleSignOut();
        }}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
});

export default Profile;
