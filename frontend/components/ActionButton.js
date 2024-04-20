import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

export default function ActionButton({ title, onPress, disabled }) {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, disabled && { opacity: 0.7 }]}
      onPress={onPress}
      disabled={disabled}
    >
      {disabled ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.btnText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#1b5738",
    paddingHorizontal: 20,
  },
  btnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
