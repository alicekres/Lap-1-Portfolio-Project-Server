const express = require("express");
const router = express.Router();
const attractionsData = require("../data/attractionsData.json");
const DataModel = require("../models/dataModel");

router.get("/", (req, res) => {
  res.send(attractionsData);
});

router.get("/:id", (req, res) => {
  try {
    const attractionsId = req.params.id;
    const selectedAttraction = attractionsData.find((x) => {
      return x.id == attractionsId;
    });

    res.status(200).send(selectedAttraction);
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

router.post("/", (req, res) => {
  const newAttractionsData = req.body;
  const newAttraction = DataModel.create({
    ...newAttractionsData,
    type: "attractionsData",
  });
  res.status(201).send(newAttraction);
});

router.patch("/:id", (req, res) => {
  if (req.body.reactions) {
    const attractionsId = req.params.id - 1;
    let newEmojiCount = req.body.reactions - 1;
    attractionsData[attractionsId].reactions[newEmojiCount]++;
    res.send(attractionsData[attractionsId]);
  } else if (req.body.reply) {
    const attractionsId = req.params.id - 1;
    let newReply = req.body.reply;
    attractionsData[attractionsId].replies.unshift(newReply);
    res.send(newReply);
  }
});

router.delete("/:id", (req, res) => {
  /* const attractionsId = parseInt(req.params.id);
  const attractionsToDestroy = attractions.findById(attractionsId);
  attractionsToDestroy.destroy();
  res.status(204).send(); */
});

module.exports = router;
