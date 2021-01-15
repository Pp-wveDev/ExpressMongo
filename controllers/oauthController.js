const express = require('express');
var router = express.Router();

resolve = require('path').resolve

var idToken;
var gEmail;

router.get('/', (req, res) => {
    if (idToken == null) {
        console.log(idToken);
        res.sendFile(resolve('views/oauth/login.html'));
    } else {
        res.render('oauth/welcome', {
            email: gEmail,
        });
    }
});

router.post('/', (req, res) => {
    idToken = req.body.idtoken;
    gEmail = req.body.email;
    //var rName = req.body.name;
    //var rImg = req.body.img;
    delete req;
    console.log("ok");
    res.redirect('/');
});

module.exports = router;