require("dotenv").config();
require("./utils/db");
const Message = require("./models/message");
// Importit
const {Users} = require('./utils/users');
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const PORT = process.env.PORT;
const messRoute = require("./routes/message");

let users = new Users();
const http = require("http").createServer(app);
const { instrument } = require("@socket.io/admin-ui");
// server-side
const io = require("socket.io")(http, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io"],
    methods: ["GET", "POST"],
  }
});

io.on('connection', socket => {
  console.log('socket id: ' + socket.id)
  io.on("send-message", (message) => {
    console.log(message)
  })
})

io.on('custom-event',(number, string, obj) => {
  console.log(number + string + obj);
})

const UserCount = require("./models/userCount");

// Middlewaret
app.use(express.json());
app.use(cors());


io.on("connection", async (socket) => {
  try {
    io.emit('updateUsersList', users.getUserList());

    socket.on("send-user", (user) => {
      console.log("User (addUser): " + users.addUser(socket.id, user).name);
      users.addUser(socket.id, user);
      console.log("User (addUser): " + users.addUser(socket.id, user));
      console.log("User (userListin 1. arvo): " + users.getUserList()[0]);
    })

    socket.on("send-message", (message) => {
      console.log("Message: " + message);
    })

    console.log("user connected");
    const findAllMessages = await Message.find({});
    socket.emit("message", findAllMessages);
    new UserCount().save();
    io.emit("user-connection", await UserCount.find({}));
  } catch (err) {
    console.error(err);
  }
  socket.on("disconnect", async () => {

    console.log("User (removeUser): " + users.removeUser(socket.id));
    users.removeUser(socket.id);
    console.log("User (removeUser): " + users.removeUser(socket.id));

    let user = users.removeUser(socket.id);
    if(user) {
      io.emit('updateUsersList', users.getUserList());
    }
    await UserCount.deleteOne({});
    console.log("user disconnected");
    io.emit("user-connection", await UserCount.find({}));
  });

  //await socket.on("disconnect", (user) => {
  //  console.log("User disconnect (1): " + users.removeUser(user));
  //  users.removeUser(user);
  //  console.log("User disconnect (2): " + users.removeUser(user));
  //})

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
  console.log(socket);
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

instrument(io, {
  auth: false
});