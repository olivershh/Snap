import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Alert,
} from "react-native";
import {
  reauthenticateWithCredential,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth } from "../firebaseSetup";
import { useNavigation } from "@react-navigation/native";

function Profile() {
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [newPassMode, setNewPassMode] = useState(false);

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

  const handleChangePassMode = () => {
    setNewPassMode(!newPassMode);
  };

  const handleChangingPassword = () => {
    if (newPassMode) {
      console.log("attempting to change password");
      if (newPassword === newPassword2) {
        console.log("passwords the same");
        // reauthenticateWithCredential(auth.currentUser, auth)
        // .then(() => {
        updatePassword(auth.currentUser, newPassword)
          // })
          .then(() => {
            console.log("password change success");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Alert.alert("Password error: ", "passwords do not match");
      }
    } else {
      console.log("hello");
    }
    setNewPassMode(!newPassMode);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.infoList}>Email: {auth.currentUser?.email}</Text>
        <View style={styles.changePassBox}>
          {newPassMode ? (
            <View style={styles.inputContainer}>
              <Text>Set new password</Text>
              <TextInput
                placeholder="New Password"
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
                style={styles.input}
                secureTextEntry
              />
              <TextInput
                placeholder="Confirm New Password"
                value={newPassword2}
                onChangeText={(text) => setNewPassword2(text)}
                style={styles.input}
                secureTextEntry
              />
            </View>
          ) : (
            <></>
          )}
          <View style={styles.buttonContainer}>
            {!newPassMode ? (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleChangePassMode();
                }}
              >
                <Text style={styles.buttonText}>Change Password</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    handleChangingPassword();
                  }}
                >
                  <Text style={styles.buttonText}>Set New Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.buttonOutline]}
                  onPress={() => {
                    handleChangePassMode();
                  }}
                >
                  <Text style={styles.buttonOutlineText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              handleSignOut();
            }}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
  },
  changePassBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  infoList: {
    fontSize: 20,
    // textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
});

export default Profile;
