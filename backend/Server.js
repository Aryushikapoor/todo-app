require('dotenv').config(); // Ensure this is at the very top

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/ToDoRoute');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // Use uppercase PORT from env

console.log('MONGODB_URL:', process.env.MONGODB_URL); // Debugging line
console.log('PORT:', PORT); // Debugging line

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use( routes);

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
