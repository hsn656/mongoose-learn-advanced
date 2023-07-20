const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userModel = require("./models/user.model");

const app = express();
dotenv.config();

app.get("/users/insert", async (req, res) => {
  await userModel.insertMany([
    {
      username: "hsn",
      result: {
        grades: [
          {
            subject: "Math",
            result: 212,
            year: 2012,
          },
          {
            subject: "Math",
            result: 212,
            year: 2013,
          },
          {
            subject: "Math",
            result: 212,
            year: 2014,
          },
          {
            subject: "Math",
            result: 212,
            year: 2015,
          },
          {
            subject: "Math",
            result: 212,
            year: 2016,
          },
        ],
      },
    },
  ]);

  res.json("insert done");
});

app.get("/users/fliter/array", async (req, res) => {
  const result = await userModel.findOne(
    {
      username: 'hsn',
    },
    {
      //   username: 1,
      'result.grades': {
        $slice: [
          {
            $filter: {
              input: "$result.grades",
              as: "grade",
              cond: {
                $and: [
                  { $eq: ["$$grade.subject", "Math"] },
                  { $gte: ["$$grade.year", 2014] },
                ],
              },
            },
          },
          0,
          2,
        ],
      },
    }
  );

  res.json(result);
});

app.use("/", (req, res) => {
  res.send("app is working");
});

mongoose.set("debug", true);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
