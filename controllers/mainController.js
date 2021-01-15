const express = require('express');
var router = express.Router();

const mongoose = require("mongoose");
const Usuario = mongoose.model('Usuario');

router.get("/", (req, res) => {
    var csrfToken = req.cookies.csrftoken;

    var usuario = Usuario.findOne({ email: "uEmail" });
    if (usuario.nombre == null) { // Not logged in
        //insertEmployee(req, res);
    } else {
        console.log(usuario.nombre);
    }

    res.render('main/mainExamenIn', {
        name: req.cookies.name + " ok"
    });
});

router.post('/check', (req, res) => {
    var usuario = Usuario.findOne({ email: req.body.correo });
    var msg;

    if (usuario == null) {
        insertUsuario(req, res);
        msg = "Bienvenido a la plataforma";

    } else {
        msg = "ya se encontraba registrado";
    }

    res.render('main/mainExamenIn', {
        correo: req.body.correo,
        msg: msg
    });
});

// Nuevo usuario
function insertUsuario(req, res) {
    var usuario = new Usuario();
    usuario.nombre = 'No asignado';
    usuario.correo = req.body.correo;

    usuario.save((err, doc) => {
        if (err) {
            console.log('Error during record insertion: ' + err);
        } else {
            console.log('User ' + usuario.name);
        }
    })
}

module.exports = router;