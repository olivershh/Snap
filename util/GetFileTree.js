import { storage, auth } from "../firebaseSetup";
import { listAll, ref, getDownloadURL } from "firebase/storage";

//returning download link in object is optional, include true/false param.
export default async function getFileTree(includeDownloadURL) {
  const fileStructure = {}; //declare empty file structure

  const listRef = ref(storage, `/user_${auth.currentUser?.email}/albums`); //create reference to correct folder (all albums)

  const albumPathsRes = await listAll(listRef); //listall subfolders (generates a big response object)

  // strip paths out from response into array e.g. ["user_1@2.com/albums/Album 1", ""user_1@2.com/albums/Album 2"]
  const albumPaths = albumPathsRes.prefixes.map(
    (folderRef) => folderRef._location.path_
  );

  // (foreach goes weird with async so looped instead)
  for (const albumPath of albumPaths) {
    const albumName = albumPath.split("/")[2]; // get album name by stripping after last slash
    fileStructure[albumName] = [];
    const albumRef = ref(storage, albumPath);
    const singleAlbumPathRes = await listAll(albumRef);

    for (const item of singleAlbumPathRes.items) {
      let downloadUrl = null;

      // if includeDownloadURL is false, this is skipped and url will remain as null
      if (includeDownloadURL) {
        const imageRef = ref(storage, item._location.path_);
        downloadUrl = await getDownloadURL(imageRef);
      }

      const photoDetails = {
        name: item._location.path_.split("/")[3],
        path: item._location.path_,
        url: downloadUrl,
      };

      fileStructure[albumName].push(photoDetails);
    }
  }

  console.log(fileStructure);
  return fileStructure;
}

const sampleResponse = {
  "Album 1": [
    {
      name: "0",
      path: "user_testingmultiplefolders@gmail.com/albums/Album 1/0",
      url: "https://firebasestorage.googleapis.com/v0/b/snapcamera-67a16.appspot.com/o/user_testingmultiplefolders%40gmail.com%2Falbums%2FAlbum%201%2F0?alt=media&token=c54362e0-8883-40ee-8528-6c26a3179007",
    },
    {
      name: "1",
      path: "user_testingmultiplefolders@gmail.com/albums/Album 1/1",
      url: "https://firebasestorage.googleapis.com/v0/b/snapcamera-67a16.appspot.com/o/user_testingmultiplefolders%40gmail.com%2Falbums%2FAlbum%201%2F1?alt=media&token=1fdbadf7-575e-4b05-a8ad-184e5a81cf30",
    },
    {
      name: "2",
      path: "user_testingmultiplefolders@gmail.com/albums/Album 1/2",
      url: "https://firebasestorage.googleapis.com/v0/b/snapcamera-67a16.appspot.com/o/user_testingmultiplefolders%40gmail.com%2Falbums%2FAlbum%201%2F2?alt=media&token=ae586bb5-4507-4a53-8df4-0f7e66aa4ccf",
    },
  ],
  "Album 2": [
    {
      name: "0",
      path: "user_testingmultiplefolders@gmail.com/albums/Album 2/0",
      url: "https://firebasestorage.googleapis.com/v0/b/snapcamera-67a16.appspot.com/o/user_testingmultiplefolders%40gmail.com%2Falbums%2FAlbum%202%2F0?alt=media&token=f4bfebe9-c354-4fff-87b4-c7276c56f937",
    },
    {
      name: "1",
      path: "user_testingmultiplefolders@gmail.com/albums/Album 2/1",
      url: "https://firebasestorage.googleapis.com/v0/b/snapcamera-67a16.appspot.com/o/user_testingmultiplefolders%40gmail.com%2Falbums%2FAlbum%202%2F1?alt=media&token=e5f92a79-76a8-4749-b6e2-44e09c614fa1",
    },
    {
      name: "2",
      path: "user_testingmultiplefolders@gmail.com/albums/Album 2/2",
      url: "https://firebasestorage.googleapis.com/v0/b/snapcamera-67a16.appspot.com/o/user_testingmultiplefolders%40gmail.com%2Falbums%2FAlbum%202%2F2?alt=media&token=e170aade-a7a0-4039-a089-a605243397c4",
    },
  ],
  "Album 3": [
    {
      name: "0",
      path: "user_testingmultiplefolders@gmail.com/albums/Album 3/0",
      url: "https://firebasestorage.googleapis.com/v0/b/snapcamera-67a16.appspot.com/o/user_testingmultiplefolders%40gmail.com%2Falbums%2FAlbum%203%2F0?alt=media&token=df05dc0a-4ae6-4e54-a033-1db2158c96b2",
    },
    {
      name: "1",
      path: "user_testingmultiplefolders@gmail.com/albums/Album 3/1",
      url: "https://firebasestorage.googleapis.com/v0/b/snapcamera-67a16.appspot.com/o/user_testingmultiplefolders%40gmail.com%2Falbums%2FAlbum%203%2F1?alt=media&token=f611eed9-91ce-4c30-9516-ccefc74d8d0a",
    },
  ],
};
