const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  hashedPw: { type: String, required: true },
});
schema.set("toJSON", {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.hashedPw;
  },
});

schema.plugin(validator);

module.exports = mongoose.model("users", schema);
