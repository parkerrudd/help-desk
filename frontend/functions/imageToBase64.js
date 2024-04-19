import * as FileSystem from "expo-file-system";

export default imageToBase64 = async (imagePath) => {
  try {
    const base64Image = await FileSystem.readAsStringAsync(imagePath, {
      encoding: "base64",
    });
    return base64Image;
  } catch (error) {
    console.error("Error converting image to base64:", error);
    return null;
  }
};
