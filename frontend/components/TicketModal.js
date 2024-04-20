import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import SelectDropdown from "react-native-select-dropdown";

import ActionButton from "./ActionButton";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function TicketModal({
  modalVisible,
  handleDismissModal,
  handleSubmitResponse,
  setUpdatedTicketStatus,
  setTicketResponse,
  updatingTicket,
  modalInfo,
}) {
  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={handleDismissModal}
      style={styles.bottomModal}
      swipeDirection={"down"}
      collapsable={true}
      onSwipeComplete={handleDismissModal}
      animationIn={"slideInUp"}
    >
      <View style={styles.modalView}>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Text style={{ fontWeight: "bold" }}>Status:</Text>
          <SelectDropdown
            buttonStyle={styles.dropdownButtonStyle}
            onSelect={(e) => setUpdatedTicketStatus(e)}
            buttonTextStyle={{ fontSize: 15 }}
            dropdownStyle={{
              borderRadius: 20,
            }}
            renderDropdownIcon={() => (
              <Image
                style={{
                  width: 15,
                  resizeMode: "contain",
                  tintColor: "#1b5738",
                }}
                source={require("../assets/images/chevron-down-solid.png")}
              />
            )}
            data={["New", "In Progress", "Resolved"]}
            defaultValue={modalInfo?.status}
          />
        </View>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Name:</Text>{" "}
          {`${modalInfo?.firstName} ${modalInfo?.lastName}`}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Email:</Text> {modalInfo?.email}
        </Text>
        <Text>
          <Text style={{ fontWeight: "bold" }}>Ticket Description:</Text>{" "}
          {modalInfo?.description}
        </Text>
        {modalInfo?.imageBase64 && (
          <>
            <Text style={{ fontWeight: "bold" }}>Photo:</Text>
            <Image
              style={{ width: 150, height: 150 }}
              source={{
                uri: `data:image/jpeg;base64,${modalInfo?.imageBase64}`,
              }}
            />
          </>
        )}
        <TextInput
          style={styles.responseInput}
          placeholder="Ticket Response..."
          placeholderTextColor={"gray"}
          onChangeText={(e) => {
            setTicketResponse(e);
            if (e.endsWith("\n")) {
              Keyboard.dismiss();
            }
          }}
          multiline={true}
        />
        <ActionButton
          title={"Submit"}
          onPress={() => handleSubmitResponse(modalInfo?._id)}
          disabled={updatingTicket}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalView: {
    display: "flex",
    padding: 20,
    gap: 20,
    backgroundColor: "#FAF9F6",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "87%",
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  responseInput: {
    backgroundColor: "#fff",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    paddingBottom: 100,
    paddingLeft: 10,
    paddingTop: 10,
  },
  dropdownButtonStyle: {
    backgroundColor: "#fff",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    height: 30,
  },
});
