const mongoose = require('mongoose');

var imgSchema = new mongoose.Schema({
    descripcion: String,
    url: String,
    likes: Number,
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
});

mongoose.model('Imagen', imgSchema);