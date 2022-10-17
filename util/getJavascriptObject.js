import { storage, auth } from "../firebaseSetup";
import { listAll, ref, getDownloadURL } from "firebase/storage";

const getJavascriptObject = async () => {
  const textFile = await fetch(
    "https://firebasestorage.googleapis.com/v0/b/snapcamera-67a16.appspot.com/o/user_testingmultiplefolders%40gmail.com%2Falbums%2FAlbum%201%2Fjsontest.json?alt=media&token=839d42cd-b22b-432e-a60a-d2705e66df7c"
  );
  const blob = textFile._bodyBlob;

  const file = await new Response(blob).text();
};

export default getJavascriptObject;

//
