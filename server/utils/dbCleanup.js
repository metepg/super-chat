const UserCount = require("../models/userCount");

module.exports = dbCleanup = (userArray) => {
  console.log("dbCleanup");
  let deleteArray = [];
  UserCount.find({}, async function (err, docs) {
    try {
      for (let i = 0; i < docs.length; i++) {
        const finder = userArray.find((e) => (e = docs[i].userName));
        console.log("finder: " + finder);
        if (!finder) {
          deleteArray.push(docs[i].userName);
          console.log("deleteArray: " + deleteArray);
        }
      }
      for (let i = 0; i < deleteArray.length; i++) {
        UserCount.deleteOne({ userName: deleteArray[i] }, async function () {
          console.log("Deleted user: " + deleteArray[i]);
        });
      }
    } catch (err) {
      console.error("err" + err);
    }
  });
};
