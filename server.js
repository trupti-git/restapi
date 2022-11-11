// create server using express
const express = require("express");
const { setMaxIdleHTTPParsers } = require("http");
//const data = require("./data.json");
const { env } = require("./config/config");
const db = require("./lib/db");
const bodyParser = require("body-parser");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({ limit: "5mb" })); // by deafult size allowed is 100kb

/*
app.get("/restaurants/", (req, res) => {
  //res.send("Hello World, from express");
  const data = getRestaurants();
  // either promise resolve / reject
  data
    .then((ret) => {
      res.send(ret);
    })
    .catch((err) => {
      res.send(err);
    });
});
*/
// async function always return promise
function getRestaurants() {
  // below line return promise

  const result = db.salesCollection.find({}).limit(1).toArray();
  return result;
}

app.get("/restaurants", (req, res) => {
  //   db.salesCollection
  //     .find({})
  //     .limit(2)
  //     .toArray((err, result) => {
  //       if (err) {
  //         console.log("error");
  //       } else {
  //         res.json(result);
  //       }
  //     });//

  db.salesCollection
    .find({})
    .limit(5)
    .project({ _id: 0, borough: 1 })
    .toArray((err, result) => {
      if (err) {
        console.log("error");
        res.json(err);
      } else {
        res.json(result);
      }
    });
});
app.post("/restaurants", (req, res) => {
  db.salesCollection.insertOne(req.body);
  // const totalCount = await db.salesCollection.countDocuments({});
  const count = db.salesCollection.countDocuments({});
  count
    .then((totalCount) => {
      res.setHeader("x-total-records", totalCount);
      res.send();
    })
    .catch((err) => {
      res.status(500).send({ error });
    });
  //   res.setHeader("x-total-records", totalCount);
  //   res.send();
});

app.put("/restaurants", (req, res) => {
  const listingQuery = { _id: req.body.id };
  const update = { borough: req.body.borough };
  console.log("listingQuery : " + listingQuery);
  console.log("Update :" + update);
  db.salesCollection.updateOne(listingQuery, { $set: update });
  const count = db.salesCollection.countDocuments({
    borough: req.body.borough,
  });
  count
    .then((totalCount) => {
      res.setHeader("x-total-records", totalCount);
      res.send();
    })
    .catch((err) => {
      res.status(500).send({ error });
    });
});

app.delete("/restaurants", (req, res) => {
    const listingQuery = { _id: req.body.id };
    
    db.salesCollection.deleteOne(listingQuery);
    const count = db.salesCollection.countDocuments({
        _id: req.body.id  ,
    });
    count
      .then((totalCount) => {
        res.setHeader("x-total-records", totalCount);
        res.send();
      })
      .catch((err) => {
        res.status(500).send({ error });
      });
  });

app.listen(env.PORT, () => {
  console.log(`Server is running at: http://localhost: ${env.PORT}/`);
});
