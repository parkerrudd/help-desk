import React, { useReducer } from "react";
import { Text, StyleSheet, View, TextInput, Alert } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import ImageUpload from "../components/ImageUpload";
import ActionButton from "../components/ActionButton";
import {
  initialTicketState,
  updateTicketState,
} from "../functions/ticketReducer";
import ticketFormValidator from "../functions/ticketFormValidator";
import handleImageUpload from "../functions/handleImageUpload";

export default function CustomerScreen() {
  const [state, dispatch] = useReducer(updateTicketState, initialTicketState);

  const handleStateChange = (inputField, inputValue) => {
    dispatch({ type: "UPDATE_FIELD", field: inputField, value: inputValue });
  };

  const handleSubmit = async () => {
    const missingValues = ticketFormValidator(state);
    if (missingValues.length === 0) {
    } else {
      const missingValuesString = missingValues.join(", ");
      Alert.alert("Missing Required Fields", `${missingValuesString}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Support Ticket</Text>
      <KeyboardAwareScrollView style={styles.formContainer} extraHeight={300}>
        <Text style={styles.labels}>
          <Text style={{ color: "red" }}>* </Text>First Name
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="First Name"
            onChangeText={(e) => handleStateChange("firstName", e)}
          />
        </View>
        <Text style={styles.labels}>
          <Text style={{ color: "red" }}>* </Text>Last Name
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Last Name"
            onChangeText={(e) => handleStateChange("lastName", e)}
          />
        </View>
        <Text style={styles.labels}>
          <Text style={{ color: "red" }}>* </Text>Email
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            onChangeText={(e) => handleStateChange("email", e)}
          />
        </View>
        <Text style={styles.labels}>Image Upload</Text>
        <ImageUpload
          imageUri={state["imageUri"]}
          onPress={() => handleImageUpload(state, dispatch)}
          dispatch={dispatch}
        />
        <Text style={styles.labels}>
          <Text style={{ color: "red" }}>* </Text>Description
        </Text>
        <View style={[styles.inputContainer, { height: 150 }]}>
          <TextInput
            placeholder="Describe your issue..."
            numberOfLines={4}
            onChangeText={(e) => handleStateChange("description", e)}
          />
        </View>
        <View style={{ marginVertical: 20 }}>
          <ActionButton title={"Submit"} onPress={handleSubmit} />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1b5738",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 70,
    marginLeft: 20,
  },
  formContainer: {
    flex: 1,
    marginTop: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    backgroundColor: "#FAF9F6",
  },
  labels: {
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
