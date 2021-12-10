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

const server = app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

const io = require("socket.io")(server, {
  cors: true,
});

// Middlewaret
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

io.on("connection", async (socket) => {
  try {
    const messages = await Message.find({});
    socket.emit("message", messages);
  } catch (err) {
    // Handle this error properly.
    console.error(err);
  }
  socket.on("message", async (recievedMsg) => {
    const date = Date.now();
    const { message, userName } = recievedMsg;
    const saveMessage = new Message({
      message,
      messageTime: date,
      userName,
    });
    try {
      await saveMessage.save();
      const messages = await Message.find({});
      io.emit("message", messages);
    } catch (err) {
      // Handle this error properly.
      console.error(err);
    }
  });
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
