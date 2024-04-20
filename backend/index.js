const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
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
  const ticket = new Ticket(req.body);
  console.log("req.body", req.body);
  try {
    await ticket.save();
    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.status(200).send(tickets);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.patch("/tickets/:ticket_id", async (req, res) => {
  const { ticket_id } = req.params;
  const { status } = req.body;
  try {
    const ticket = await Ticket.findByIdAndUpdate(
      ticket_id,
      { status },
      { new: true }
    );
    if (!ticket) {
      return res.status(404).send({ error: "Ticket not found" });
    }
    res.status(200).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});
