const mongoose = require("mongoose");
const ShortUniqueId = require("short-unique-id");

//Instantiate id
const uid = new ShortUniqueId();

const urlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    default: () => uid(),
  },
  click: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = mongoose.model("fcol", urlSchema);
