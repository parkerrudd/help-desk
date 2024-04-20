import React, { useReducer, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";

import ImageUpload from "../components/ImageUpload";
import ActionButton from "../components/ActionButton";
import {
  initialTicketState,
  updateTicketState,
} from "../functions/ticketReducer";
import ticketFormValidator from "../functions/ticketFormValidator";
import handleImageUpload from "../functions/handleImageUpload";
import createTicket from "../api/createTicket";

export default function CustomerScreen() {
  const [state, dispatch] = useReducer(updateTicketState, initialTicketState);
  const [submittingTicket, setSubmittingTicket] = useState(false);

  const handleStateChange = (inputField, inputValue) => {
    dispatch({ type: "UPDATE_FIELD", field: inputField, value: inputValue });
  };

  const handleSubmit = async () => {
    const missingValues = ticketFormValidator(state);
    if (missingValues.length === 0) {
      await createTicket(state, setSubmittingTicket);
      Toast.show({
        type: "success",
      });
      dispatch({ type: "RESET_FIELDS" });
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
            value={state["firstName"]}
          />
        </View>
        <Text style={styles.labels}>
          <Text style={{ color: "red" }}>* </Text>Last Name
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Last Name"
            onChangeText={(e) => handleStateChange("lastName", e)}
            value={state["lastName"]}
          />
        </View>
        <Text style={styles.labels}>
          <Text style={{ color: "red" }}>* </Text>Email
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            onChangeText={(e) => handleStateChange("email", e)}
            keyboardType="email-address"
            value={state["email"]}
            autoCapitalize="none"
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
        <TextInput
          style={styles.descriptionInput}
          placeholder="Describe your issue..."
          onChangeText={(e) => handleStateChange("description", e)}
          value={state["description"]}
          multiline={true}
        />
        <View style={{ marginVertical: 20, paddingBottom: 20 }}>
          <ActionButton
            title={"Submit"}
            onPress={handleSubmit}
            disabled={submittingTicket}
          />
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
  descriptionInput: {
    backgroundColor: "#fff",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    paddingBottom: 100,
    paddingLeft: 10,
    paddingTop: Platform.OS === "ios" ? 10 : 0,
  },
});
