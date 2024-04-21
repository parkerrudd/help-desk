import axios from "axios";

export default fetchTickets = async () => {
  const res = await axios.get("https://192.168.86.29/tickets");
  return res.data;
};
