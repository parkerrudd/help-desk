import axios from "axios";
import { Alert } from "react-native";

export const updateTicketStatus = async (ticketId, status) => {
  try {
    const res = await axios.patch(
      `http://192.168.86.29:3000/tickets/${ticketId}`,
      { status: status }
    );
    console.log("res", res);
  } catch (err) {
    Alert.alert("Oops", "Ticket could not be udated. Please try again later.");
    console.error(err);
  }
};
