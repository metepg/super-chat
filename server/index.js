/**
 * Palvelin jossa koko sovellus pyörii
 * Reactilla tehty frontend tuotantoversio (build kansio) tarjotaan node palvelimelta selaimelle
 */
require("dotenv").config();
require("./utils/db");
const Message = require("./models/message");
// Importit
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log("Listening on port: " + PORT);
});

const io = require("socket.io")(server, {
  cors: true,
});

const UserCount = require("./models/userCount");
const dbCleanup = require("./utils/dbCleanup");
// Middlewaret
app.use(express.json());
app.use(cors());
app.use(express.static("build"));

let userArray = [];

setInterval(() => {
  dbCleanup(userArray);
  userArray = [];
}, 120000);
/**
 * Socket-io:n viestittelyt
 * @author Nicklas Sundell, Mete Güneysel
 */
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
  /**
   * Tallentaa käyttäjän online-hakua varten tietokantaan
   * @author Nicklas Sundell
   * @param {} user
   */
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

// Koodi
// Tämä reitti hoitaa signupin ja loginit
app.use("/auth", authRoute);
// req oliosta saa vastaanotettavaa tietoa esim (req.body) antaa lähetetyn jsonin oliona
// res oliolla voi lähettää pingaajalle vastauksen json muodossa esim res.json({message: 'hyvin menee'})
// voi myös lähettää status codeja (suositeltavaa) kuten 404 tai 200 esim res.status(400).json({ error: 'message' })
// status codet on hyödyllisiä debugatessa
