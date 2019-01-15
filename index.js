const router = require("express").Router();
const client = require('./client');
module.exports = router;



router.get("/", (req, res) => {
    // use our client to get all of our hats from our database 
    // by creating raw sql query to be passed to query method
  client.query("SELECT * from input", (err, data) => {
      // log any errors that you encounter
    if (err) return console.error(err);
    // map over the array of returned rows and log them into your console
    console.log("All objects in the table");
    data.rows.forEach(rowObject => {      
      console.log(rowObject);
    });
    // send back via http response body the data
    res.send(data.rows);
  });
  return;
});

router.get("/:userID", (req, res) => {
  let { userID } = req.params;
  client.query("SELECT * from input", (err, data) => {
    if (err) return console.error(err);
    data.rows = data.rows.filter(rowObject => rowObject.id == userID);
    console.log(`Object with ID = ${userID}`);
    data.rows.forEach(rowObject => {      
      console.log(rowObject);
    });
    res.send(data.rows);
  });
  return;
});

router.delete("/:userID", (req, res) => {
  let { userID } = req.params;
  client.query(`DELETE FROM input WHERE id = ${userID}`, (err, data) => {
    if (err) return console.error(err);
    console.log(`After deleting ID = ${userID}`);
    client.query("SELECT * from input", (err, data) => {
      data.rows.forEach(rowObject => {
        console.log(rowObject);
      });
      res.send(data.rows);
    });
  });
  return;
});



router.post("/", (req, res) => {
 
  const { input, length } = req.body;
  lenght = parseFloat(length);

  client.query(
    `INSERT INTO input VALUES ('${input}',  '${lenght}')`,
    (err, data) => {
      if (err) return console.error(err);
      console.log(`After adding input = ${input}, length = ${lenght}`);
      client.query("SELECT * from input", (err, data) => {
        data.rows.forEach(rowObject => {
          console.log(rowObject);
        });
        res.status(201).send(data.rows);
      });
    }
  );
  return;
});