import { Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

import imageToBase64 from "./imageToBase64";

export default handleImageUpload = async (state, dispatch) => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  const { status: cameraStatus } =
    await ImagePicker.requestCameraPermissionsAsync();
  if (status !== "granted" || cameraStatus !== "granted") {
    alert("Sorry, we need camera access to make this work.");
    return;
  }

  Alert.alert("Upload Images", "Select an option", [
    {
      text: "Take a Photo",
      onPress: async () => {
        try {
          const res = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
          });
          if (!res.canceled) {
            const imageUri = res.assets[0].uri;
            dispatch({
              type: "UPDATE_FIELD",
              field: "imageUri",
              value: imageUri,
            });
            const base64 = await imageToBase64(imageUri);
            dispatch({
              type: "UPDATE_FIELD",
              field: "imageBase64",
              value: base64,
            });
          }
        } catch (err) {
          console.error(err);
          alert("Sorry, something went wrong. Please try again later.");
        }
      },
    },
    {
      text: "Select From Camera Roll",
      onPress: async () => {
        try {
          const res = await ImagePicker.launchImageLibraryAsync();
          if (!res.canceled) {
            const imageUri = res.assets[0].uri;
            dispatch({
              type: "UPDATE_FIELD",
              field: "imageUri",
              value: imageUri,
            });
            const base64 = await imageToBase64(imageUri);
            dispatch({
              type: "UPDATE_FIELD",
              field: "imageBase64",
              value: base64,
            });
          }
        } catch (err) {
          console.error(err);
          alert("Sorry, something went wrong. Please try again later.");
        }
      },
    },
    {
      text: "Cancel",
      style: "cance",
    },
  ]);
};
