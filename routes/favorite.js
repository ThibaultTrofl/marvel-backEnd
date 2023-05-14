const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");

router.post("/favorite/caracter", async (req, res) => {
  try {
    const { userId, favorite } = req.body;

    const existUser = await User.findById({ _id: userId });

    existUser.favorite.caracters.splice(0, existUser.favorite.caracters.length);
    for (let i = 0; i < favorite.length; i++) {
      const addId = favorite[i];
      existUser.favorite.caracters.push(addId);
    }
    await existUser.save();
    return res.json(existUser.favorite.caracters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/favorite/comic", async (req, res) => {
  try {
    const { userId, favorite } = req.body;
    const existUser = await User.findById({ _id: userId });

    existUser.favorite.comics.splice(0, existUser.favorite.comics.length);
    for (let i = 0; i < favorite.length; i++) {
      const addId = favorite[i];
      existUser.favorite.comics.push(addId);
    }
    await existUser.save();
    return res.json(existUser.favorite.comics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/favorite/get/caracters", async (req, res) => {
  try {
    const { userId } = req.body;
    const existUser = await User.findById({ _id: userId });

    return res.json(existUser.favorite.caracters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/favorite/get/comics", async (req, res) => {
  try {
    const { userId } = req.body;
    const existUser = await User.findById({ _id: userId });

    return res.json(existUser.favorite.comics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
