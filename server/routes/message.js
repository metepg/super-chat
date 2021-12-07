const router = require("express").Router();
const Message = require("../models/message");

router.post("/", async (req, res) => {
  const date = Date.now();
  const { message, messageTime, userName } = req.body;
  console.log(req.body);
  const saveMessage = new Message({
    message,
    messageTime: date,
    userName,
  });
  try {
    const savedMessage = await saveMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    console.log(error);
  }
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
