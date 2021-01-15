const express = require('express');
var router = express.Router();

const https = require('https');
const apiKey = '5224ae23bb1f5b98066f8a14a9427532';
const url = "https://api.openweathermap.org/data/2.5/weather?q=Marbella&appid=a29285115588058bd2ed2502e55ad274";

router.get('/', (req, res) => {
    https.get(url, (resp) => {
        resp.on('data', (data) => {
            res.render('main/message', {
                message: data
            })
        })
    })
});

module.exports = router;