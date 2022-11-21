var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET all roadtrips

router.get("/", async function (req, res) {
  try {
    let roadtrips = await db("SELECT * FROM roadtrips");
    res.send(roadtrips.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET by roadtrip_id

router.get("/featured/:roadtrip_id", async function (req, res) {
  let roadtrip_id = req.params.roadtrip_id;
  try {
    let result = await db(`SELECT * FROM  roadtrips WHERE id=${roadtrip_id}`);
    let roadtrip = result.data[0];
    if (roadtrip.length === 0) {
      res
        .status(404)
        .send({ error: "There is no roadtrip with the requested id" });
    } else {
      res.send(roadtrip);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// GET by user_id

router.get("/:user_id", async function (req, res) {
  let user_id = req.params.user_id;
  try {
    let result = await db(`SELECT * FROM  roadtrips WHERE user_id=${user_id}`);
    let roadtrip = result.data;
    if (roadtrip.length === 0) {
      res
        .status(404)
        .send({ error: "There are no roadtrips for the requested user" });
    } else {
      res.send(roadtrip);
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// POST

router.post("/", async function (req, res) {
  // The request's body is available in req.body
  let { image_url, title, countries, description, done, user_id } = req.body; //insert array for stops
  // sql syntax is tested & correct
  console.log(req.body);
  let sql = `
      INSERT INTO roadtrips (image_url, title, countries, description, done, user_id)
      VALUES ('${image_url}', '${title}', '${countries}', '${description}', ${done}, ${user_id});
      SELECT last_insert_id()

      `; //1 are the fields and 2 these are the values

  //constructor of the sql
  try {
    let results = await db(sql); //adds item
    //foreach stop in array, insert into stops table
    let result = await db("SELECT * FROM roadtrips"); //get the list of items
    // let newItems = result.data;
    res.status(201).send(result.data[result.data.length - 1]);
    // send data to client
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// DELETE

router.delete("/:roadtrip_id", async (req, res) => {
  // URL params are available in req.params
  let roadtrip_id = req.params.roadtrip_id;
  try {
    // get item with id matching req params
    let result = await db(`SELECT * FROM roadtrips WHERE id = ${roadtrip_id}`);
    // if this returns nothing, id doesn’t exist: throw an error
    if (result.data.length === 0) {
      res.status(404).send({ error: "item not found" });
    } else {
      // delete item with id matching req params
      await db(`DELETE FROM roadtrips WHERE id = ${roadtrip_id}`);
      // save result to result variable
      let result = await db(`SELECT * FROM roadtrips`);
      // send result data to client and return server status
      res.status(200).send(result.data);
    }
    // if try fails, catch with 500 error
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//UPDATE roadtrip as complete

router.patch("/:roadtrip_id/done", async function (req, res, next) {
  let roadtrip_id = req.params.roadtrip_id;
  let completed = req.body;

  try {
    await db(
      `UPDATE roadtrips SET done=${completed.done} WHERE id=${roadtrip_id}`
    );
    let completedTrip = await db(
      `SELECT * FROM roadtrips WHERE id=${roadtrip_id}`
    );
    res.status(201).send(completedTrip.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
