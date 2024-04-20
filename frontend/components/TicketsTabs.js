import React, { useState } from "react";
import { FlatList, View } from "react-native";

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
    await updateTicketStatus(ticketId, updatedTicketStatus, setUpdatingTicket);
    refetchTickets();
    setModalVisible(false);
  };

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
