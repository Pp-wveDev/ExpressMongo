const express = require('express');
var router = express.Router();

const mongoose = require("mongoose");

const Tutorial = mongoose.model('Tutorial');
const Comment = mongoose.model('Comment');

// Tutoriales añadir tuto, push a array y añadir rel uno a muchos
// -------------------------------------------------------------------------------------------------
router.get('/', (req, res) => {
    createTutorial(req, res);
});

router.get('/imgAdd', (req, res) => {
    addImage(req, res);
});

router.get('/commentAdd', (req, res) => {
    addComment(req, res);
});

// -------------------------------------------------------------------------------------------------


function createTutorial(req, res) {
    var nTut = new Tutorial({
        title: "Test tutorial",
        author: "José Díaz"
    })

    nTut.save((err, doc) => {
        if (!err) {
            res.render('main/message', {
                message: "ok",
            })
        } else {
            console.log("Error while creating tutorial: " + err);
            res.render('main/message', {
                message: "error",
            });
        }
    });
}

function addImage(req, res) {
    var img = [{
        imgTitle: 'Crash bandicootes',
        url: 'https://delarbol.com',
        uploadTime: Date.now(),
    }, {
        imgTitle: 'Robinson',
        url: 'lolxs'
    }];

    Tutorial.findOneAndUpdate({ author: 'José Díaz' }, { '$push': { images: img } }, (err, doc) => {
        if (!err) {
            res.render('main/message', {
                message: "ok",
            })
        } else {
            console.log("Error while creating tutorial: " + err);
            res.render('main/message', {
                message: "error",
            });
        }
    });
}

function addComment(req, res) {
    /*
    var com = new Comment({
        username: 'PepeDJ94',
        text: "I like hot dogs",
        createAt: Date.now(),
    });
    
    com.save();
    */
    Comment.findById("5fffa53ca2472b11c873d815").exec((err, doc) => {
        var dId = doc._id;

        Tutorial.findOneAndUpdate({ author: 'José Díaz' }, { '$push': { comments: dId } }, (err, docu) => {
            if (!err) {
                res.render('main/message', {
                    message: "ok",
                })
            } else {
                console.log("Error while creating tutorial: " + err);
                res.render('main/message', {
                    message: "error" + err,
                });
            }
        });
    })
}

module.exports = router;