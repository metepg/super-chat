const router = require("express").Router();
const Message = require("../models/message");

router.post("/", async (req, res) => {
  const date = Date.now();
  console.log(date);
  const { message, messageTime } = req.body;
  console.log(message, messageTime);
  const saveMessage = new Message({
    message,
    messageTime: date,
  });
  try {
    const savedMessage = await saveMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    console.log(error);
  }
  //console.log(req.body);
});

router.get("/", async (req, res) => {
  try {
    const allMessages = await Message.find({});
    res.status(200).json(allMessages);
  } catch (error) {
    res.status(400).json({ error: error });
  }
});
module.exports = router;
