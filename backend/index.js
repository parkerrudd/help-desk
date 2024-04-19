const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
const Ticket = require("./models/ticketModel");

mongoose
  .connect(
    "mongodb+srv://admin:trustme123@helpdeskapi.dpxirzm.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));

app.post("/tickets", async (req, res) => {
  console.log("req", req);
  const ticket = new Ticket(req.body);
  try {
    await ticket.save();
    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).send(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
});
