var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureSameUser } = require("../middleware/guards");

/* GET users listing. */
router.get("/", async function (req, res, next) {
  let sql = "SELECT * FROM users ORDER BY username";

  try {
    let results = await db(sql);
    let users = results.data;
    users.forEach((u) => delete u.password); // don't return passwords
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//get

router.get("/:user_id", ensureSameUser, async function (req, res, next) {
  let { user_id } = req.params;
  let sql = "SELECT * FROM users WHERE id = " + user_id;

  try {
    let results = await db(sql);
    // We know user exists because he/she is logged in!
    let user = results.data[0];
    delete user.password; // don't return the password
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.patch("/:user_id", async function (req, res, next) {
  let user_id = req.params.user_id;
  let completed = req.body;

  try {
    await db(`UPDATE users SET done=${completed.done} WHERE id=${roadtrip_id}`);
    let completedTrip = await db(
      `SELECT * FROM roadtrips WHERE id=${roadtrip_id}`
    );
    res.status(201).send(completedTrip.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
