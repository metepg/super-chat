const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL).catch((error) => console.log(error));

mongoose.connection.on("connected", () => {
  console.log("Succesfully connected to MONGODB");
});

mongoose.connection.on("error", (e) => {
  console.log(`MongoDB error ${e}`);
});
