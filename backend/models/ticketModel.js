const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    imageUri: String,
    imageBase64: String,
    description: String,
    status: { type: String, default: "New" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", ticketSchema);
