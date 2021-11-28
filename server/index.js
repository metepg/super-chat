require("dotenv").config();
require("./utils/db");
// Importit
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./routes/auth");
const PORT = process.env.PORT;

// Middlewaret
app.use(express.json());
app.use(cors());

// Koodi
app.get("/ping", (req, res) =>
  res.send("<script>console.log('yeah')</script>")
);
app.post("/post", (req, res) => console.log(req.body));

// Tämä reitti hoitaa signupin ja loginit
app.use("/auth", authRoute);

// app.use("/api/login", loginRoute);
// Malli endpointista POST /api/message
// req oliosta saa vastaanotettavaa tietoa esim (req.body) antaa lähetetyn jsonin oliona
// res oliolla voi lähettää pingaajalle vastauksen json muodossa esim res.json({message: 'hyvin menee'})
// voi myös lähettää status codeja (suositeltavaa) kuten 404 tai 200 esim res.status(400).json({ error: 'message' })
// status codet on hyödyllisiä debugatessa
app.post("/api/message", (req, res) => console.log(req.body));

app.listen(PORT, () => console.log(`SUPER CHAT RUNNING ON PORT ${PORT}`));
