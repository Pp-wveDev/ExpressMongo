const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    nombre: String,
    correo: String,
    imagenes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Imagen'
    }],
});

mongoose.model('Usuario', userSchema);