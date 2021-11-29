const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const getJwt = require("../utils/jwtoken");

router.post("/signup", async (req, res) => {
  const { name, password } = req.body;
  // Hashataan salasana ettei se näy tietokannassa sellaisenaan
  const saltRounds = 10;
  const hashedPw = await bcrypt.hash(password, saltRounds);
  const user = new User({
    name,
    password: hashedPw,
  });
  // Yritä tallentaa käyttäjä tietokantaan
  try {
    const savedUser = await user.save();
    const jwtUser = getJwt(savedUser);
    res.status(200).json(jwtUser);
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
    user === null ? false : await bcrypt.compare(password, user.password);

  if (!(user && passwordOk)) {
    return res.status(401).json({
      message: "väärä nimi tai salasana",
    });
  }
  const jwtUser = getJwt(user);
  res.status(200).json(jwtUser);
});

module.exports = router;
