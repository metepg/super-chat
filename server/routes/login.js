const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginRoute = require("express").Router();
const User = require("../models/user");

loginRoute.post("/", async (req, res) => {
  const { name, password } = req.body;

  // Hae nimen perusteella tiedot tietokannasta
  const user = await User.findOne({ name });

  // Jos käyttäjää ei löydy tai salasana ei täsmää...
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

  console.log(jwtUser);

  const token = jwt.sign(jwtUser, process.env.JWT_HASH, {
    expiresIn: 60 * 60 * 2, // <- Token vanhenee 2 tunnissa
  });

  res.status(200).send({ name: user.name, token });
});

module.exports = loginRoute;
