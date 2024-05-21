const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const port = 3030;

const apiKey = "a16819bd1ea18d9baae74837fa6544b3";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static('public'));

app.get('/', (req, res) => res.render('index', { weather: null, error: null }));

app.post("/weatherapi", (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: "Error in fetching weather of city" });
        } else {
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: "Error, please try again" });
            } else {
                res.render('index', { weather: weather, error: null });
            }
        }
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
