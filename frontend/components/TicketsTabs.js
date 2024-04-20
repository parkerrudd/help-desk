import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  View,
  Image,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import { FlashList } from "@shopify/flash-list";
import SelectDropdown from "react-native-select-dropdown";

import ActionButton from "./ActionButton";
import { updateTicketStatus } from "../api/updateTicketStatus";

export default function TicketsTabs({ tickets }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [ticketResponse, setTicketResponse] = useState("");
  const [updatedTicketStatus, setUpdatedTicketStatus] = useState("");

  const handleTicketPress = (item) => {
    setModalVisible(true);
    setModalInfo(item);
  };

  const handleDismissModal = () => {
    setModalVisible(false);
    setModalInfo(null);
  };

  const handleSubmitResponse = async (ticketId) => {
    console.log("Ticket Response:", ticketResponse);
    updateTicketStatus(ticketId, updatedTicketStatus);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        onPress={() => handleTicketPress(item)}
      >
        <View style={styles.textInfoContainer}>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Status:</Text> {item?.status}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail">
            <Text style={{ fontWeight: "bold" }}>Description:</Text>{" "}
            {item?.description}
          </Text>
        </View>
        <Image
          source={require("../assets/images/plus-solid.png")}
          style={styles.plusIcon}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tickets}
        renderItem={renderItem}
        estimatedItemSize={100}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={handleDismissModal}
        style={styles.bottomModal}
        swipeDirection={"down"}
        collapsable={true}
        onSwipeComplete={handleDismissModal}
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
            <Text style={{ fontWeight: "bold" }}>Email:</Text>{" "}
            {modalInfo?.email}
          </Text>
          <Text>
            <Text style={{ fontWeight: "bold" }}>Ticket Description:</Text>{" "}
            {modalInfo?.description}
          </Text>
          <TextInput
            style={styles.responseInput}
            placeholder="Ticket Response..."
            placeholderTextColor={"gray"}
            numberOfLines={20}
            onChangeText={(e) => setTicketResponse(e)}
          />
          <ActionButton
            title={"Submit"}
            onPress={() => handleSubmitResponse(modalInfo?._id)}
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  textInfoContainer: {
    width: "90%",
    gap: 10,
  },
  plusIcon: {
    height: 20,
    width: 20,
    tintColor: "#1b5738",
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalView: {
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    padding: 20,
    gap: 20,
    backgroundColor: "#FAF9F6",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "60%",
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  responseInput: {
    backgroundColor: "#fff",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
    paddingBottom: 200,
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
