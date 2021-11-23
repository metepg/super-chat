require('dotenv').config();

const express = require('express');

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL).catch((error) => console.log(error));
console.log(mongoose.connection.readyState);
const app = express();
app.use(express.json());

app.get('/ping', (req, res) =>
  res.send("<script>console.log('yeah')</script>")
);
app.post('/post', (req, res) => console.log(req.body));
const port = process.env.PORT;
app.listen(port, () => console.log(`SUPER CHAT RUNNING ON PORT ${port}`));
