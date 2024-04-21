import axios from "axios";

export default fetchTickets = async () => {
  const res = await axios.get("https://help-desk-akxg.onrender.com/tickets");
  return res.data;
};
