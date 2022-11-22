var express = require("express");
var router = express.Router();
const db = require("../model/helper");
// const { ensureUserLoggedIn } = require("../middleware/guards");
// const { ensureSameUser } = require("../middleware/guards");

router.get("/:user_id", async function (req, res) {
  let user_id = req.params.user_id;
  // let roadtrip_id = req.params.roadtrip_id;

  try {
    let favorite_roadtrips = await db(
      `SELECT roadtrips.*  from roadtrips 
      LEFT JOIN favorite_roadtrips ON favorite_roadtrips.roadtrip_id = roadtrips.id
       WHERE favorite_roadtrips.user_id = ${user_id}`
    );
    res.send(favorite_roadtrips.data);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.post("/:user_id", async (req, res) => {
  //let roadtrip_id = req.params.roadtrip_id;
  let { roadtrip_id } = req.body;

  let user_id = req.params.user_id;

  let sql = `
          INSERT INTO favorite_roadtrips (user_id, roadtrip_id)
          VALUES (${user_id}, ${roadtrip_id})`;
  try {
    await db(sql);
    let result = await db(
      `SELECT * FROM favorite_roadtrips WHERE user_id = ${user_id}`
    );
    let favorites = result.data;
    res.status(201).send(favorites);
  } catch (err) {
    res.status(500).send({ error: err.message });
    console.log(err.message);
  }
});
// router.delete("/:id/", async function (req, res, next) {
//   let stopId = req.params.id;

//   try {
//     let result = await db(`SELECT * FROM stops WHERE id=${stopId}`);
//     if (result.data.length === 0) {
//       res.status(404).send({ error: "Stop not found" });
//     } else {
//       await db(`DELETE FROM stops WHERE id = ${stopId}`);
//       let result = await db(`SELECT * FROM stops`);
//       let stops = result.data;
//       res.status(201).send(stops);
//     }
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//   }
// });

// router.post("/:user_id/:roadtrip_id", async (req, res) => {
//   let roadtrip_id = req.params.roadtrip_id;
//   // let user_id = req.locals.user_id;
//   let user_id = req.params.user_id;

//   let sql = `
//           INSERT INTO favorite_roadtrips (user_id, roadtrip_id)
//           VALUES (${user_id}, ${roadtrip_id})
//       `;
//   try {
//     await db(sql);
//     let result = await db(`SELECT * FROM favorite_roadtrips`);
//     let favorites = result.data;
//     res.status(201).send(favorites);
//   } catch (err) {
//     res.status(500).send({ error: err.message });
//     console.log(err.message);
//   }
// });

module.exports = router;
