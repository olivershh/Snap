import { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import {
  reauthenticateWithCredential,
  signOut,
  updatePassword,
} from "firebase/auth";
import { auth, db } from "../firebaseSetup";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  // const back_img = require("../potentialBG/4.webp");
  // const back_img = require("../potentialBG/5.jpg");
  // const back_img = require("../potentialBG/7.jpg");
  // const back_img = require("../potentialBG/8.webp");
  // const back_img = require("../potentialBG/9.jpg");
  // const back_img = require("../potentialBG/CameraBackground6.jpg");
  const back_img = require("../potentialBG/10doodles.png");
  // const back_img_2 = require("../textures/paperplain.jpg");
  const back_img_2 = require("../textures/papermedium.jpg");
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
          let url = docSnap.data().avatarUrl;
          let urlDefault =
            "https://png.pngtree.com/png-clipart/20190613/original/pngtree-who-icon-png-image_3568672.jpg";
          url = url ? url : urlDefault;
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
        <ImageBackground style={styles.backImage}>
          <ImageBackground source={back_img} style={styles.backgroundContainer}>
            <View style={styles.polaroidContainer}>
              <Image
                style={styles.avatarPhoto}
                source={avatarUrl}
                resizeMode="cover"
              ></Image>

              <Text style={styles.emailText}>
                Email: {auth.currentUser?.email}
              </Text>
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
                  <>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        handleChangePassMode();
                      }}
                    >
                      <Text style={styles.buttonText}>Change Password</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.button, styles.buttonOutline]}
                      onPress={() => {
                        handleSignOut();
                      }}
                    >
                      <Text
                        style={[styles.buttonText, styles.buttonOutlineText]}
                      >
                        Sign Out
                      </Text>
                    </TouchableOpacity>
                  </>
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
                      style={[
                        styles.button,
                        styles.buttonOutline,
                        ,
                        styles.buttonCancel,
                      ]}
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
          </ImageBackground>
        </ImageBackground>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backImage: {
    width: "100%",
    height: "100%",
    // backgroundColor: "bisque",
    backgroundColor: "#FBE4FF",
  },
  backgroundContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  polaroidContainer: {
    width: "70%",
    height: "50%",
    borderWidth: 2,
    borderColor: "#254252",
    justifyContent: "center",
  },
  avatarPhoto: {
    height: "80%",
    width: "100%",
    borderWidth: 18,
    borderColor: "white",
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
    // marginTop: 40,
  },
  button: {
    backgroundColor: "#254252",
    width: "100%",
    marginTop: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    borderColor: "#254252",
    borderWidth: 3,
  },
  buttonCancel: {
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
    backgroundColor: "white",
  },
  changePassBox: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  emailText: {
    fontSize: 16,
    color: "black",
    padding: 10,
    backgroundColor: "white",
    borderBottomWidth: 0.3,
    borderColor: "grey",
    textAlign: "center",
    height: "20%",
  },
});

export default Profile;
