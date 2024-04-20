import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function TicketRenderItem({ item }) {
  return (
    <TouchableOpacity>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );
}
