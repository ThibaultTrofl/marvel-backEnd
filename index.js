const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const process = require("dotenv");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const caracterRoutes = require("./routes/caracters");
const comicRoutes = require("./routes/comics");
const userRoutes = require("./routes/user");
const favoriteRoutes = require("./routes/favorite");

app.use(caracterRoutes);
app.use(comicRoutes);
app.use(userRoutes);
app.use(favoriteRoutes);

mongoose.connect(
  "mongodb+srv://thibaulttrofleau:hiEdnxXWwGIiC3o6@cluster0.lhfrkhd.mongodb.net/Marvel"
);

app.get("/", (req, res) => {
  try {
    return res.status(200).json({ message: "You are connect" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Page not found 😢" });
});

app.listen(3000, () => {
  console.log("Server Started 🚀");
});
