import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

const FormInput = ({
  label,
  onChangeText,
  value,
  placeholder,
  keyboardType,
  autoCapitalize,
}) => (
  <View>
    <Text style={styles.label}>
      <Text style={{ color: "red" }}>* </Text>
      {label}
    </Text>
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 10,
  },
  inputContainer: {
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
  },
});

export default FormInput;
