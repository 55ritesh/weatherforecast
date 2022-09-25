const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index1.html");
});

app.post("/", function (req, res) {
    console.log(req.body.cityName);
    const query = req.body.cityName;
    const apikey = "31fa1c2c9596d38a249031aed680ee85";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units = imperial";

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            console.log(temp);
            res.write("<p>the weather is currently " + weatherDescription + "</p>");
            res.write("<h1>the temp in " + query + " is " + temp + " degree celcius.</h1>");
            res.write("<img src=" + imgURL + ">");
            res.send()
        })
    })
    console.log("Post Req received");
})





app.listen(3000, function () {
    console.log("server is running on prt no 3000")
})