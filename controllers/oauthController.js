const express = require('express');
var router = express.Router();

resolve = require('path').resolve

router.get('/', (req, res) => {
    res.sendFile(resolve('views/main/login.html'));
});

module.exports = router;