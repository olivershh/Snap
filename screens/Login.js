import {
  KeyboardAvoidingView,
  ImageBackground,
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import {useEffect, useState} from "react";
import {auth, db} from "../firebaseSetup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {useNavigation} from "@react-navigation/native";
import {setDoc, doc} from "firebase/firestore";
import {useIsFocused} from "@react-navigation/native";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const [error, setError] = useState(null);

  const isFocused = useIsFocused();

  const back_img = require("../images/sign_back.jpeg");
  const [avatar, setAvatar] = useState(
    "https://damagedphotorestoration.com/blog/images/gallery/news_preview2_131.jpg"
  );
  useEffect(() => {
    // signOut(auth);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, [isFocused]);

  const decodeError = (err) => {
    console.log(err);
    const errObj = {
      "auth/invalid-email": "The email format is not correct.",
      "auth/email-already-in-use": "The user with the email already exists.",
      "auth/weak-password": "Password should be at least 6 characters.",

      "auth/user-mismatch": "The username and password do not match.",
      "auth/wrong-password": "The password is not correct.",
      "auth/user-not-found": "The user with this email doesn't exist",
    };
    if (!err.code) return "Error!";
    if (errObj[err.code]) return errObj[err.code];
    else return err.code;
  };

  const handleSignUp = async () => {
    console.log("attempt to sign up");
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newEmail = newUser.user.email;
      console.log("registered with: ", newEmail);
      const userDoc = doc(db, `users/${newEmail}`);
      const userData = {
        albums: {
          0: {
            name: "Album 1",
            size: 2,
            photosTaken: 0,
            isFilmFull: false,
            path: `user_${newEmail}/albums/`,
            photos: [],
          },
        },
        currFilm: 0,
        avatarUrl: avatar,
      };
      const user = await setDoc(userDoc, userData, {merge: true});
    } catch (err) {
      setError(decodeError(err));
    }
  };

  const handleLogIn = () => {
    console.log("attempt to log in");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        console.log("logged in with: ", userCredentials.user.email);
      })
      .catch((err) => {
        setError(decodeError(err));
      });
  };

  if (!auth.currentUser?.email) {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>
          <Text style={{color: "red"}}>Snap</Text> - retro camera{" "}
          <Text style={{color: "#254252"}}>app</Text>!
        </Text>
        <ImageBackground
          source={back_img}
          resizeMode="repeat"
          style={styles.backImage}
        >
          <View style={styles.backgoundContainer}>
            <View style={styles.polaroidContainer}>
              <View style={styles.inputContainer}>
                <ImageBackground
                  style={styles.avatarPhoto}
                  source={{uri: avatar}}
                  resizeMode="cover"
                >
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="white"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setError(null);
                    }}
                    style={styles.input}
                  />

                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="white"
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      setError(null);
                    }}
                    style={styles.input}
                    secureTextEntry
                  />
                  <TextInput
                    placeholder="Avatar URL"
                    placeholderTextColor="white"
                    value={avatar}
                    onChangeText={(text) => {
                      setAvatar(text);
                      setError(null);
                    }}
                    style={styles.input}
                  />
                </ImageBackground>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleLogIn} style={styles.button}>
                  <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSignUp}
                  style={[styles.button, styles.buttonOutline]}
                >
                  <Text style={styles.buttonOutlineText}>Sign up</Text>
                </TouchableOpacity>
              </View>
              {error ? (
                <View style={styles.errorMessage}>
                  <Text style={styles.errMsgText}>{error} </Text>
                </View>
              ) : null}
            </View>
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "10%",
  },
  title: {
    paddingTop: 30,
    fontSize: 20,
    fontWeight: "800",
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
    width: "80%",
    height: "45%",
    borderWidth: 0.5,
    borderColor: "grey",
    transform: [{rotate: "-5deg"}],
  },
  avatarPhoto: {
    height: "100%",
    justifyContent: "center",
    // alignItems: "center",
  },
  inputContainer: {
    height: "80%",
    backgroundColor: "rgba(0, 0, 0, 1)",
    borderWidth: 20,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
  buttonContainer: {
    height: "15%",
    borderBottomWidth: 0.5,
    borderColor: "grey",
    marginHorizontal: "auto",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "white",
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#254252",
  },
  errorMessage: {
    width: "100%",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  errMsgText: {
    color: "red",
  },
});
