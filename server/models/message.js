/**
 * Tietokantaskeema viestille
 * Poistetaan turhat mongodbn palauttamat kentät (_id. __v) ennen frontendiin lähettämistä
 *
 * @author Mete Güneysel
 */

const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  message: { type: String, required: true },
  messageTime: { type: Date, required: true },
  userName: { type: String, required: true },
});
schema.set("toJSON", {
  virtuals: true,
  transform: (document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("messages", schema);
