const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  message: { type: String, required: true },
  messageTime: { type: Date, required: true },
  userName: { type: String, required: true },
  edited: { type: Boolean, required: false },
});
schema.set("toJSON", {
  virtuals: true,
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("messages", schema);
