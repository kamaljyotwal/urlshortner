const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const importurl = require("./models/shortUrl");

// const blogImported = require("./models/blogs");

// uri string to connect at atlas
const uri = process.env.URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  // .then((res) => console.log("connected to db"))
  .then((res) => app.listen(process.env.PORT || 5000))
  .catch((err) => console.log(err));

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortie = await importurl.find();
  // console.log(shortie);
  res.render("index", { shortie: shortie });
  // res.render(
  //   "index"
  //   // , { shortUrl: shortUrl }
  // );
});

app.post("/short", async (req, res) => {
  await importurl.create({ full: req.body.fullUrl });
  res.redirect("/");

  // const dataInstance = new importurl({
  //   full: req.body.fullUrl,
  // });
  // dataInstance
  //   .save()
  //   .then((result) => res.send(result))
  //   .catch((err) => console.log(err));
});

app.get("/:ss", async (req, res) => {
  const tom = await importurl.findOne({ short: req.params.ss });
  // console.log(tom);
  // res.send("something");
  tom.click++;
  tom.save();
  res.redirect(tom.full);
});

// below lines were written when i was learning mongo/mongoose connection for first time
// app.get("/blog", (req, res) => {
//   const dataInstance = new blogImported({
//     name: "some7",
//     age: 22,
//     male: false,
//   });
//   dataInstance
//     .save()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// // to get all the documents
// app.get("/alldata", (req, res) => {
//   blogImported
//     .find()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// app.listen(process.env.PORT || 5000);
