require("dotenv").config();
require("./utils/db");
const Message = require("./models/message");
// Importit
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const PORT = process.env.PORT;
const messRoute = require("./routes/message");
const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: true });

// Middlewaret
app.use(express.json());
app.use(cors());

io.on("connection", async (socket) => {
  try {
    console.log("user connected");
    const findAllMessages = await Message.find({});
    socket.emit("message", findAllMessages);
  } catch (err) {
    console.error(err);
  }

  socket.on("message", async (receivedMsg) => {
    console.log("message: ", receivedMsg);
    const date = Date.now();
    const { message, userName } = receivedMsg;
    const saveMessage = new Message({
      message,
      messageTime: date,
      userName,
    });
    try {
      await saveMessage.save();
      io.emit("message", await Message.find({}));
    } catch (err) {
      console.error(err);
    }
  });
  socket.on("delete-message", async (receivedMsg) => {
    console.log("delete-message: ", receivedMsg);
    try {
      await Message.deleteOne({ _id: receivedMsg });
      socket.emit("message", await Message.find({}));
    } catch (err) {
      console.error(err);
    }
  });
});

io.on("message", (socket) => {
  console.log("vittu", socket);
});

http.listen(4000, function () {
  console.log("HTTP LISTENING PORT 4000");
});

// Koodi
// Tämä reitti hoitaa signupin ja loginit
app.use("/auth", authRoute);
//Tämä reitti hoitaa viestien lähetyksen ja vastaanoton
app.use("/api/message", messRoute);
// app.use("/api/login", loginRoute);
// Malli endpointista POST /api/message
// req oliosta saa vastaanotettavaa tietoa esim (req.body) antaa lähetetyn jsonin oliona
// res oliolla voi lähettää pingaajalle vastauksen json muodossa esim res.json({message: 'hyvin menee'})
// voi myös lähettää status codeja (suositeltavaa) kuten 404 tai 200 esim res.status(400).json({ error: 'message' })
// status codet on hyödyllisiä debugatessa

app.listen(PORT, () => console.log(`SUPER CHAT RUNNING ON PORT ${PORT}`));
