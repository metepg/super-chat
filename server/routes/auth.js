const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { name, password } = req.body;
  // Hashataan salasana ettei se näy tietokannassa sellaisenaan
  const saltRounds = 10;
  const hashedPw = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name,
    hashedPw,
  });
  // Yritä tallentaa käyttäjä tietokantaan
  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    const { message } = error.errors.name;
    res.status(400).json({ message });
  }
});

router.post("/login", async (req, res) => {
  const { name, password } = req.body;
  // Etsi käyttäjänimi tietokannasta
  // Vertaa käyttäjän antamaa salasanaa tietokannassa olevaan
  const user = await User.findOne({ name });
  const passwordOk =
    user === null ? false : await bcrypt.compare(password, user.hashedPw);

  if (!(user && passwordOk)) {
    return res.status(401).json({
      message: "väärä nimi tai salasana",
    });
  }

  const jwtUser = {
    name: user.name,
    id: user.id,
  };
  // Tee jwt käyttäjälle
  const token = jwt.sign(jwtUser, process.env.JWT_HASH, {
    expiresIn: 60 * 60 * 2, // <- Token vanhenee 2 tunnissa
  });
  res.status(200).send({ name: user.name, token });
});

module.exports = router;
