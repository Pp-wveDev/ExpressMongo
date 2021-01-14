const mongoose = require('mongoose');

var tutorialSchema = new mongoose.Schema({
    title: String,
    author: String,
    images: [],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
});

mongoose.model('Tutorial', tutorialSchema);