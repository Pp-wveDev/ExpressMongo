const express = require('express');
var router = express.Router();

// Cargamos p. princ.
router.get('/', (req, res) => {
    if (global.email == null) {
        res.render('main/mainExamenOut', {
            title: 'Login',
            layout: 'loginLayout'
        });
    } else {
        res.redirect('main');
    }
});

// Nos autentificamos
router.post('/', (req, res) => {
    res.cookie('email', req.body.email);
    res.cookie('name', req.body.name);

    res.redirect('main/');
    console.log('ok');
});

module.exports = router;