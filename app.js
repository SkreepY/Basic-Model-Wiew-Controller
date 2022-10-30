const express = require("express");
const app = express();
const controller = require("./Controller/FormController");
const fs = require("fs");
var bodyParser = require("body-parser");

var urlEncoder = bodyParser.urlencoded({ extended: false });

app.use(express.static("assets"));
app.set("view engine", "ejs");

controller(app, urlEncoder, fs);

app.listen(8080);
