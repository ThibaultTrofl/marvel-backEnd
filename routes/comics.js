const express = require("express");
const axios = require("axios");
const router = express.Router();

require("dotenv").config();

router.post("/comics/:id", async (req, res) => {
  try {
    const responseCaracter = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.id}?apiKey=${process.env.REACTEUR_MARVEL_API}`
    );
    return res.status(200).json(responseCaracter.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/comics/", async (req, res) => {
  try {
    const skip = req.query.page || 0;
    const responseCaracter = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.REACTEUR_MARVEL_API}&skip=${skip}`
    );
    return res.status(200).json(responseCaracter.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/comic/favorite/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const responseCaracter = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${id}?apiKey=${process.env.REACTEUR_MARVEL_API}`
    );
    return res.status(200).json(responseCaracter.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
