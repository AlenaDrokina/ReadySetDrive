var express = require("express");
var router = express.Router();
const db = require("../model/helper");
// const { ensureUserLoggedIn } = require("../middleware/guards");
const { ensureSameUser } = require("../middleware/guards");

router.get("/:user_id", ensureSameUser, async function (req, res) {
  let user_id = req.params.user_id;
  try {
    let favorite_roadtrips = await db(
      `SELECT * FROM favorite_roadtrips WHERE user_id = ${user_id}`
    );
    res.send(favorite_roadtrips.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/:user_id/:roadtrip_id", ensureSameUser, async (req, res) => {
  let roadtrip_id = req.params.roadtrip_id;
  // let user_id = req.locals.user_id;
  let user_id = req.params.user_id;

  let sql = `
          INSERT INTO favorite_roadtrips (user_id, roadtrip_id)
          VALUES (${user_id}, ${roadtrip_id})
      `;
  try {
    await db(sql);
    let result = await db(`SELECT * FROM favorite_roadtrips`);
    let favorites = result.data;
    res.status(201).send(favorites);
  } catch (err) {
    res.status(500).send({ error: err.message });
    console.log(err.message);
  }
});

module.exports = router;
