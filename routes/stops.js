var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureSameUserB } = require("../middleware/guards");

// GET all stops for a roadtrip

router.get("/:roadtrip_id", async function (req, res) {
  let roadtrip_id = req.params.roadtrip_id;
  
  try {
    let results = await db(
      `SELECT * FROM stops WHERE roadtrip_id=${roadtrip_id}`
    );
    let stops = results.data;
    // if (stops.length === 0) {
    //   res
    //     .status(404)
    //     .send({ error: "There are no stops for the requested roadtrip" });
    // } else {
      res.send(stops);
    // }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//POST new stop

router.post("/", ensureSameUserB, async (req, res) => {
  let { title, address, longitude, latitude, roadtrip_id, user_id } = req.body;

  let sql = `
        INSERT INTO stops (title, address, longitude, latitude, roadtrip_id)
        VALUES ('${title}', '${address}', ${longitude}, ${latitude}, ${roadtrip_id})
    `;
  try {
    await db(sql);
    let result = await db(`SELECT * FROM stops WHERE roadtrip_id=${roadtrip_id}`);
    let stops = result.data;
    res.status(201).send(stops);
  } catch (err) {
    res.status(500).send({ error: err.message });
    console.log(err.message);
  }
});

// DELETE stop 

router.delete("/:id", async function (req, res, next) {
  let stopId = req.params.id;
  try {
    let result = await db(`SELECT * FROM stops WHERE id=${stopId}`);
    if (result.data.length === 0) {
      res.status(404).send({ error: "Stop not found" });
    } else {
      await db(`DELETE FROM stops WHERE id=${stopId}`);
      let result = await db(`SELECT * FROM stops`);
      let stops = result.data;
      res.status(201).send(stops);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
