import axios from "axios";
import { Alert } from "react-native";

export default createTicket = async (body, setSubmittingTicket) => {
  try {
    setSubmittingTicket(true);
    await axios.post("http://192.168.86.29:3000/tickets", body);
  } catch (err) {
    console.error(err);
    Alert.alert(
      "Oops",
      "Ticket could not be submitted. Please try again later."
    );
  } finally {
    setSubmittingTicket(false);
  }
};
