import {useEffect, useState} from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Alert,
  ImageBackground,
} from "react-native";
import {
  reauthenticateWithCredential,
  signOut,
  updatePassword,
} from "firebase/auth";
import {auth, db} from "../firebaseSetup";
import {useNavigation} from "@react-navigation/native";
import {doc, getDoc} from "firebase/firestore";

function Profile() {
  const back_img = require("../images/sign_back.jpeg");
  const [newPassword, setNewPassword] = useState("");
  const [newPassword2, setNewPassword2] = useState("");
  const [newPassMode, setNewPassMode] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const email = auth.currentUser?.email;
    const docRef = doc(db, "users", email);
    getDoc(docRef).then((docSnap) => {
      if (docSnap.exists()) {
        setAvatarUrl(() => {
          const url = docSnap.data().avatarUrl;
          return {
            uri: url,
          };
        });
      } else {
      }
    });
  }, []);

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
        <ImageBackground
          source={back_img}
          resizeMode="repeat"
          style={styles.backImage}
        >
          <View style={styles.backgoundContainer}>
            <View style={styles.polaroidContainer}>
              {avatarUrl ? (
                <ImageBackground
                  style={styles.avatarPhoto}
                  source={avatarUrl}
                  resizeMode="cover"
                >
                  <Text style={styles.infoList}>
                    Email: {auth.currentUser?.email}
                  </Text>
                </ImageBackground>
              ) : null}
              <TouchableOpacity
                style={[styles.button, styles.signOut]}
                onPress={() => {
                  handleSignOut();
                }}
              >
                <Text style={[styles.buttonText, styles.signOutText]}>
                  Sign Out
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.changePassBox}>
              {newPassMode ? (
                <View style={styles.inputContainer}>
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
          </View>
        </ImageBackground>
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
  backImage: {
    width: "100%",
    height: "100%",
  },
  backgoundContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  polaroidContainer: {
    width: "70%",
    height: "35%",
    borderWidth: 0.5,
    borderColor: "grey",
    justifyContent: "center",
    transform: [{rotate: "-5deg"}],
  },
  avatarPhoto: {
    height: "100%",
    // backgroundColor: "rgba(0, 0, 0, 1)",
    borderWidth: 20,
    borderColor: "white",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  inputContainer: {
    width: "70%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "#254252",
    borderWidth: 3,
    marginTop: 5,
  },
  buttonContainer: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#254252",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "red",
    borderWidth: 3,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#254252",
  },
  changePassBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  infoList: {
    fontSize: 16,
    color: "white",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 10,
  },
  signOut: {
    backgroundColor: "white",
    borderRadius: 0,
  },
  signOutText: {
    color: "black",
  },
});

export default Profile;
