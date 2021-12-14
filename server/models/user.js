/**
 * Tietokantaskeema käyttäjälle
 * Poistetaan turhat mongodbn palauttamat kentät (_id. __v password) ennen frontendiin lähettämistä
 *
 * @author Mete Güneysel
 */
const mongoose = require("mongoose");
const validator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
schema.set("toJSON", {
  virtuals: true,
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

schema.plugin(validator);

module.exports = mongoose.model("users", schema);
