require('dotenv').config()
const _ = require("lodash");
const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("home");
});

app.post("/ingredient", function (req, res) {
    const ingr = req.body.ingr;
    const category = req.body.category;
    const calories = req.body.calories;
    fetch("https://api.edamam.com/api/food-database/v2/parser?app_id=" + process.env.INFOAPP_ID + "&app_key=" + process.env.INFOAPP_KEY + "&ingr=" + ingr)
        .then(res => res.json())
        .then(doc => {
            if (doc.parsed[0])
                res.render("ingredient", { products: doc });
            else
                res.render("not-found");
        });
});

app.post("/recipes", function (req, res) {
    const rec = req.body.rec;
    fetch("https://api.edamam.com/search?app_id=" + process.env.RECAPP_ID + "&app_key=" + process.env.RECAPP_KEY + "&q=" + rec)
        .then(res => res.json())
        .then(doc => {
            res.render("recipes", { products: doc.hits });
        });
});

app.listen(process.env.PORT, () => console.log("Server started at 3000"));



