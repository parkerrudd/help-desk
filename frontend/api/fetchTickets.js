import axios from "axios";

export default fetchTickets = async () => {
  const res = await axios.get("https://help-desk-akxg.onrender.com/tickets");
  console.log("res.data", res.data);
  return res.data;
};
