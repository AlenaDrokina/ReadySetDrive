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
    res.status(500).send({ error: "hey" });
  }
});

// router.post("/:user_id", async (req, res) => {
//   let user_id = req.params.user_id;
//   let { image_url, slogan } = req.body;
//   // let { image_url } = req.body.image_url;
//   // let { slogan } = req.body.slogan;
//   // let user_id = req.params.user_id;

//   let sql = `
//           INSERT INTO users (image_url, slogan, id)
//           VALUES ("${image_url}", "${slogan}", ${user_id}) `;
//   try {
//     await db(sql);
//     let result = await db(`SELECT * FROM users WHERE id = ${user_id}`);
//     let data = result.data;
//     res.status(201).send(data);
//   } catch (err) {
//     res.status(500).send({ error: "hey" });
//     console.log(err.message);
//   }
// });

router.patch("/:user_id", async function (req, res, next) {
  let user_id = req.params.user_id;
  let slogan = req.body.slogan;
  let image_url = req.body.image_url;

  try {
    await db(
      `UPDATE users SET image_url='${image_url}', slogan='${slogan}' WHERE id=${user_id}`
    );
    let data = await db(`SELECT * FROM users WHERE id=${user_id}`);

    res.status(201).send(data.data);
  } catch (err) {
    res.status(500).send({ error: "hey" });
  }
});

module.exports = router;
