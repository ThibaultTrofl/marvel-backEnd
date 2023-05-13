const express = require("express");
const router = express.Router();
const User = require("../models/User");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
// const convertToBase64 = require("../utils/convertToBase64");
const uid2 = require("uid2");

router.post("/user/signup", async (req, res) => {
  try {
    const { account, email, password } = req.body;
    const username = account.username;

    const existUser = await User.findOne({ email: email });

    if (existUser) {
      console.log("already exist");
      return res.json({ message: "This mail is already link to an account" });
    } else if (!username) {
      return res.json({ message: "Please fill the username case" });
    }

    let newUser = new User({
      email: email,
      account: { username: username },
      password: password,
      favorite: [],
    });

    const token = uid2(32);
    newUser.token = token;
    const salt = uid2(32);
    newUser.salt = salt;
    const hash = SHA256(req.body.password + salt).toString(encBase64);
    newUser.hash = hash;

    await newUser.save();

    const result = await User.findOne({ email: email }).select(
      `-email -newsletter -hash -salt -__v`
    );

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "Please fill cases" });
    }

    const currentUser = await User.findOne({ email: email });

    if (!currentUser) {
      return res.json({
        message: "Sorry, I can't find your account.",
      });
    }
    const hash = SHA256(password + currentUser.salt).toString(encBase64);

    if (hash !== currentUser.hash) {
      res.json({
        message: "Sorry, I can't find your account.",
      });
    } else if (hash === currentUser.hash) {
      const result = await User.findOne({ email: email }).select(
        `-email -newsletter -hash -salt -__v`
      );
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
