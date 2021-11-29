const jwt = require("jsonwebtoken");
module.exports = function getJwt(user) {
  console.log(user);
  const jwtUser = { name: user.name, id: user.id };
  const token = jwt.sign(jwtUser, process.env.JWT_HASH, {
    expiresIn: 60 * 60 * 2, // <- Token vanhenee 2 tunnissa
  });
  jwtUser.token = token;
  return jwtUser;
};
