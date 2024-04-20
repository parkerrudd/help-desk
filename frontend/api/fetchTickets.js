import axios from "axios";

export default fetchTickets = async () => {
  const res = await axios.get("http://192.168.86.29:3000/tickets");
  return res.data;
};
