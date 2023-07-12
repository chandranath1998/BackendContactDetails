const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {

    college : {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserContact", contactSchema);
