const express = require("express");
const axios = require("axios");
const router = express.Router();

require("dotenv").config();

router.post("/caracter/:id", async (req, res) => {
  try {
    const responseCaracter = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.id}?apiKey=${process.env.REACTEUR_MARVEL_API}`
    );
    return res.status(200).json(responseCaracter.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/caracter", async (req, res) => {
  try {
    const name = req.query.name || "";
    const skip = req.query.page || 0;
    const responseCaracter = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.REACTEUR_MARVEL_API}&name=${name}&skip=${skip}`
    );
    return res.status(200).json(responseCaracter.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/caracter/favorite/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const responseCaracter = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${process.env.REACTEUR_MARVEL_API}`
    );
    return res.status(200).json(responseCaracter.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
