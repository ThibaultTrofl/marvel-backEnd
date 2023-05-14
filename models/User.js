const mongoose = require("mongoose");

const User = mongoose.model("users", {
  email: String,
  account: { username: String, avatar: Object },
  favorite: { caracters: [], comics: [] },
  token: String,
  hash: String,
  salt: String,
});

module.exports = User;
