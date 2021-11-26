require("dotenv").config();

// Importit
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const bcrypt = require("bcrypt");

const User = require("./models/user");
const loginRoute = require("./routes/login");

// Middlewaret
app.use(express.json());
app.use(cors());

// Koodi
const port = process.env.PORT;
mongoose.connect(process.env.MONGO_URL).catch((error) => console.log(error));

mongoose.connection.on("connected", () => {
  console.log("Succesfully connected to MONGODB");
});

mongoose.connection.on("error", (e) => {
  console.log(`MongoDB error ${e}`);
});

app.get("/ping", (req, res) =>
  res.send("<script>console.log('yeah')</script>")
);
app.post("/post", (req, res) => console.log(req.body));

// Malli endpointista POST /api/messages
// req oliosta saa vastaanotettavaa tietoa esim (req.body) antaa lähetetyn jsonin oliona
// res oliolla voi lähettää pingaajalle vastauksen json muodossa esim res.json({message: 'hyvin menee'})
// voi myös lähettää status codeja (suositeltavaa) kuten 404 tai 200 esim res.status(400).json({ error: 'message' })
// status codet on hyödyllisiä debugatessa
app.post("/api/messages", (req, res) => console.log(req.body));

app.listen(port, () => console.log(`SUPER CHAT RUNNING ON PORT ${port}`));

app.post("/api/signup", async (req, res) => {
  const { name, password } = req.body;

  // Hashataan salasana ettei se näy tietokannassa sellaisenaan
  const saltRounds = 10;
  const hashedPw = await bcrypt.hash(password, saltRounds);

  const user = new User({
    name,
    hashedPw,
  });

  // Tietokantaan tallennus try catchin sisään
  // (niin ku kaikki tietokantoihin liittyen)
  // muuten node kaatuu
  try {
    // Tietokanta palauttaa käyttäjän tiedot tietokannasta
    // models/user.js tiedostossa määritellyt delete jutut poistaa
    // tietokannan palauttamasta jsonista arkaluontoiset kentät
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    const { message } = error.errors.name;
    res.status(400).json({ message });
  }
});

app.use("/api/login", loginRoute);
