require("dotenv").config();
let express = require("express");
let app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

console.log("Hello world");
app.use("/public", express.static(__dirname + "/public"));
app.use((req, res, next) => {
  const string = req.method + " " + req.path + " - " + req.ip;
  console.log(string);
  next();
});

app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});

app.get("/json", (req, res) => {
  res.json(
    process.env.MESSAGE_STYLE === "uppercase"
      ? { message: "hello world".toUpperCase() }
      : { message: "Hello world" }
  );
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app
  .route("/name")
  .get((req, res) => {
    res.json({ name: `${req.query.first} ${req.query.last}` });
  })
  .post((req, res) => {
    res.json({ name: `${req.body.first} ${req.body.last}` });
  });

module.exports = app;
