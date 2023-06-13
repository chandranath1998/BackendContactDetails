const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: false,
      required: true,
    },
    phone: {
      type: Number,
      unique: false,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserContact", contactSchema);
