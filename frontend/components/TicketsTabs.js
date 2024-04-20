import React, { useState } from "react";
import { FlatList, View, Text } from "react-native";
import Toast from "react-native-toast-message";

import TicketRenderItem from "./TicketRenderItem";
import { updateTicketStatus } from "../api/updateTicketStatus";
import TicketModal from "./TicketModal";

export default function TicketsTabs({ tickets, refetchTickets }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState(null);
  const [ticketResponse, setTicketResponse] = useState("");
  const [updatedTicketStatus, setUpdatedTicketStatus] = useState("");
  const [updatingTicket, setUpdatingTicket] = useState(false);

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
    if (updatedTicketStatus.length) {
      await updateTicketStatus(
        ticketId,
        updatedTicketStatus,
        setUpdatingTicket
      );
      setUpdatedTicketStatus("");
    }
    refetchTickets();
    setModalVisible(false);
    Toast.show({
      type: "success",
    });
  };

  if (!tickets?.length) {
    return (
      <Text style={{ textAlign: "center", marginTop: 5 }}>
        No tickets yet...
      </Text>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tickets}
        renderItem={({ item }) => (
          <TicketRenderItem item={item} handleTicketPress={handleTicketPress} />
        )}
      />
      <TicketModal
        handleDismissModal={handleDismissModal}
        handleSubmitResponse={handleSubmitResponse}
        modalInfo={modalInfo}
        modalVisible={modalVisible}
        setTicketResponse={setTicketResponse}
        setUpdatedTicketStatus={setUpdatedTicketStatus}
        updatingTicket={updatingTicket}
      />
    </View>
  );
}
