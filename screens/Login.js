import {
  KeyboardAvoidingView,
  Text,
  TextInput,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseSetup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { setDoc, doc } from "firebase/firestore";
import { useIsFocused } from "@react-navigation/native";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const [error, setError] = useState(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    // signOut(auth);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, [isFocused]);

  const handleSignUp = async () => {
    console.log("attempt to sign up");
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).catch((err) => {
        alert("Error adding new user: ", err);
      });
      const newEmail = newUser.user.email;
      console.log("registered with: ", newEmail);
      const userDoc = doc(db, `users/${newEmail}`);
      const userData = {
        albums: {
          0: {
            name: "Album1",
            size: 2,
            photosTaken: 0,
            isFilmFull: false,
            path: `user_${newEmail}/albums/`,
            photos: [],
          },
        },
        currFilm: 0,
      };
      const user = await setDoc(userDoc, userData, { merge: true });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleLogIn = () => {
    console.log("attempt to sign in");
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("logged in with: ", user.email);
      })
      .catch((err) => {
        console.log(err);

        if (err.code === "auth/invalid-email") {
          setError("There is no user with this email");
        } else if (err.code === "auth/user-mismatch") {
          setError("The username and password do not match");
        } else {
          console.log(err);
          setError(err.code);
        }
        Alert.alert("authentication error: ", error);
      });
  };

  if (!auth.currentUser?.email) {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.input}
            secureTextEntry
          />
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
      </KeyboardAvoidingView>
    );
  }
  // else {
  //   return (
  //     <View style={styles.container}>
  //       <Text>You're already logged in as: {`${auth.currentUser?.email}`}</Text>
  //       <TouchableOpacity
  //         onPress={() => {
  //           navigation.navigate("Home");
  //         }}
  //         style={styles.button}
  //       >
  //         <Text style={styles.buttonText}>Return to Camera</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
});
