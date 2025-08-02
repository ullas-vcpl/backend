const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Entry = require('./models/Entry');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log("MongoDB connected")).catch(err => console.error("MongoDB connection error:", err));

app.post('/submit', async (req, res) => {
  const { name, email, contact } = req.body;
  await Entry.create({ name, email, contact });
  res.send("Submitted successfully");
});

app.post('/admin', async (req, res) => {
  if (req.body.password !== process.env.ADMIN_PASSWORD) return res.status(403).send("Unauthorized");
  const entries = await Entry.find().sort({ _id: -1 });
  res.json(entries);
});

app.get('/test', (req, res) => {
  res.send("Test successful");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
