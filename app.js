const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static("public"));

app.get("/", function (req, res) {
    console.log("received first get request");

    const url = 'https://www.recreation.gov/api/permits/250014/availability/month?start_date=2021-02-01T00:00:00.000Z&commercial_acct=false&is_lottery=false'
    request(url, function (error, response, body) {
        const data = JSON.parse(body);

        const date = data.payload.availability[371].date_availability;
        console.log(data)
        console.log(date)

        const iterate = (obj) => {
            Object.keys(obj).forEach(key => {
                console.log(`${key}: ${obj[key]}`)

                if (typeof obj[key] === 'object') {
                    iterate(obj[key])
                }
            })
        }
        iterate(date)
    });
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});

