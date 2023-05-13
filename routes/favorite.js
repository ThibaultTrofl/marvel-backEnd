const express = require("express");
const router = express.Router();
const axios = require("axios");
const User = require("../models/User");

router.post("/favorite/add", async (req, res) => {
  try {
    // console.log("oui");
    const { userId, favoriteId } = req.body;

    const existUser = await User.findById({ _id: userId });

    if (!existUser.favorite || existUser.favorite.length < 1) {
      //   console.log("not favorite");
      existUser.favorite.push(favoriteId);
      await existUser.save();
      return res.json(existUser.favorite);
    } else {
      console.log(existUser.favorite.length);
      //   for (let i = 1; i <= existUser.favorite.length; i = i + 1) {
      //     console.log(i);
      const favoriteCardExist = existUser.favorite.indexOf(favoriteId);
      console.log("position " + favoriteCardExist);

      if (favoriteCardExist !== -1) {
        console.log("delete");
        existUser.favorite.splice(favoriteCardExist, 1);
        //   console.log("before remove " + existUser.favorite);
        await existUser.save();
        //   console.log("after remove " + existUser.favorite);
        return res.json(existUser.favorite);
      } else if (favoriteCardExist === -1) {
        console.log("add");
        //   console.log("before add " + existUser.favorite);
        existUser.favorite.push(favoriteId);
        await existUser.save();
        //   console.log("after add " + existUser.favorite);
        return res.json(existUser.favorite);
      }
      //   }
    }

    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/favorite", async (req, res) => {
  try {
    const { userId } = req.body;

    const existUser = await User.findById({ _id: userId });

    if (existUser.favorite.length > 0) {
      return res.json(existUser.favorite);
    }

    return;
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
