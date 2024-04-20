import axios from "axios";
import { Alert } from "react-native";

export const updateTicketStatus = async (
  ticketId,
  status,
  setUpdatingTicket
) => {
  try {
    setUpdatingTicket(true);
    const res = await axios.patch(
      `https://help-desk-akxg.onrender.com/tickets/${ticketId}`,
      { status: status }
    );
  } catch (err) {
    Alert.alert("Oops", "Ticket could not be udated. Please try again later.");
    console.error(err);
  } finally {
    setUpdatingTicket(false);
  }
};
