const mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    username: String,
    text: String,
    createdAt: Date
});

mongoose.model("Comment", commentSchema);