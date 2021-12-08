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
  socket.join("chat");

  try {
    const messages = await Message.find({});
    // const formatted = messages.map((m) => {
    //   m.messageTime = new Date(m.messageTime).toLocaleString("en-GB");
    //   return m;
    // });

    // const formatted = messages.map(
    //   (m) =>{ return {...m, messageTime = new Date(m.messageTime).toLocaleString("en-GB")}
    // }
    // );
    socket.emit("history", messages);
  } catch (err) {
    // Handle this error properly.
    console.error(err);
  }

  // socket.on("message", (msg) => {
  //   console.log("message" + JSON.stringify(msg));
  //   io.emit("message", msg);
  // });
});

io.on("sendMessage", (msg, callback) => {
  const message = new Message({ message: msg, sender: socket.user });

  message.save(function (err) {
    if (err) {
      return callback(err);
    }

    io.to("chat").emit("message", message);
  });
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

http.listen(4000, function () {
  console.log("HTTP LISTENING PORT 4000");
});

// Koodi
app.get("/ping", (req, res) =>
  res.send("<script>console.log('yeah')</script>")
);
app.post("/post", (req, res) => console.log(req.body));

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
