const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");
/**
 * Schema käyttäjien onlinestatuksen määrittämiseen
 * @author Nicklas Sundell
 */
const schema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
});
schema.set("toJSON", {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
  },
});

schema.plugin(validator);

module.exports = mongoose.model("usercount", schema);
