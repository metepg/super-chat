const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
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

module.exports = mongoose.model('users', schema);
