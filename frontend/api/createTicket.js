import axios from "axios";

export default createTicket = async (body) => {
  try {
    const res = await axios.post("http://192.168.86.29:3000/tickets", body);
    console.log("res", res);
  } catch (err) {
    console.error(err);
  }
};
