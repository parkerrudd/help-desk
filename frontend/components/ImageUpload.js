import React from "react";
import { TouchableOpacity, StyleSheet, Image, View } from "react-native";

export default function ImageUpload({ imageUri, onPress, dispatch }) {
  const handleDeleteImage = () => {
    dispatch({ type: "UPDATE_FIELD", field: "imageUri", value: "" });
    dispatch({ type: "UPDATE_FIELD", field: "imageBase64", value: "" });
  };
  return (
    <>
      {!imageUri?.length ? (
        <TouchableOpacity style={styles.imageUploadContainer} onPress={onPress}>
          <Image
            source={require("../assets/images/plus-solid.png")}
            style={styles.plus}
            tintColor={"#1b5738"}
          />
        </TouchableOpacity>
      ) : (
        <View style={{ position: "relative", width: 110, height: 100 }}>
          <TouchableOpacity
            style={styles.trashCanContainer}
            onPress={handleDeleteImage}
          >
            <Image
              source={require("../assets/images/trash-can-regular.png")}
              style={styles.trashCan}
            />
          </TouchableOpacity>
          <Image
            source={{ uri: imageUri }}
            style={{ width: 100, height: 100 }}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  imageUploadContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#1b5738",
    borderWidth: 1,
    borderStyle: "dashed",
    backgroundColor: "#aaf0c9",
  },
  plus: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  trashCanContainer: {
    position: "absolute",
    top: -10,
    right: 0,
    zIndex: 100,
    borderColor: "red",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 50,
    padding: 5,
  },
  trashCan: {
    height: 15,
    width: 15,
    tintColor: "red",
  },
});
