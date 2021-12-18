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
const UserCount = require("./models/userCount");
const dbCleanup = require("./utils/dbCleanup");
// Middlewaret
app.use(express.json());
app.use(cors());

let userArray = [];

setInterval(() => {
  dbCleanup(userArray);
  userArray = [];
}, 120000);

io.on("connection", async (socket) => {
  try {
    console.log("user connected");
    const findAllMessages = await Message.find({});
    socket.emit("message", findAllMessages);
    io.emit("usersList", await UserCount.find({}));
  } catch (err) {
    console.error(err);
  }
  socket.on("disconnect", async () => {
    console.log("user disconnected");
    io.emit("usersList", await UserCount.find({}));
  });
  socket.on("user-disconnect", async (user) => {
    console.log("user-disconnect: " + user);
    try {
      await UserCount.deleteOne({ userName: user });
      io.emit("usersList", await UserCount.find({}));
    } catch (err) {
      console.error(err);
    }
  });
  socket.on("user-connection", async (user) => {
    saveUser(user);
    io.emit("usersList", await UserCount.find({}));
  });

  function saveUser(user) {
    const userName = new UserCount({ userName: user });
    try {
      UserCount.find({ userName: user }, async function (err, docs) {
        if (err) {
          console.error(err);
        } else {
          if (docs.length === 0) {
            await userName.save();
          }
        }
      });
    } catch (err) {
      console.error(err);
    }
  }
  socket.on("message", async (receivedMsg) => {
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
      saveUser(receivedMsg.userName);
      io.emit("usersList", await UserCount.find({}));
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
  socket.on("edit-message", async ({ id, message, edited }) => {
    console.log("edit-message: ", id);
    try {
      await Message.updateOne({_id: id}, {$set: {edited: "true", message: message}});
      socket.emit("message", await Message.find({}));
    } catch (err) {
      console.error(err);
    }
  });
  socket.on("online", async (user) => {
    try {
      if (userArray.find((e) => (e = user)) !== user) {
        userArray.push(user);
        console.log("Online user: " + user);
      }
    } catch (err) {
      console.error(err);
    }
  });
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
