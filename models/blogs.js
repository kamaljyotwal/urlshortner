// this is useless file, i created while learning how to attach mongoose/mongo with app via a tutorial and how schemas look

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dataSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    male: {
      required: true,
      type: Boolean,
    },
    pretty: {
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

const blogger = mongoose.model("shit", dataSchema);
module.exports = blogger;
