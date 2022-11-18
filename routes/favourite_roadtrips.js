var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/favorite_roadtrips", async function (req, res) {
  try {
    let favorite_roadtrips = await db("SELECT * FROM favourite_roadtrips");
    res.send(favorite_roadtrips.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/favorite_roadtrips/:roadtrip_id", async (req, res) => {
  let { user_id, roadtrip_id } = req.body;

  let sql = `
          INSERT INTO favorite_roadtrips (user_id, roadtrip_id)
          VALUES (${user_id}, ${roadtrip_id})
      `;
  try {
    await db(sql);
    let result = await db("SELECT * FROM favorite_roadtrips");
    let stops = result.data;
    res.status(201).send(stops);
  } catch (err) {
    res.status(500).send({ error: err.message });
    console.log(err.message);
  }
});

module.exports = router;
