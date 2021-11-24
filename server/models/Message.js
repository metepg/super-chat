const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  message: { type: String, required: true },
  messageTime: { type: Date, required: true },
  id: { type: String, required: true },
});
schema.set('toJSON', {
  virtuals: true,
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject_id.toString();
    // delete returnedObject_id;
    // delete returnedObject.__v;
  },
});

module.exports = mongoose.model('messages', schema);
