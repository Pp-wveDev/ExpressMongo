const express = require('express');
var router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        console.log(file)
        cb(null, file.originalname)
    }
});


// Upload a photo
router.get('/', (req, res) => {
    res.render('cloudinary/upload');
})

// Post to cloudinary
router.post('/', (req, res) => {
    const upload = multer({ storage }).single('img')
    upload(req, res, function(err) {
        if (err) {
            return res.send(err)
        }
        console.log("File uploaded to server");

        // Enviamos el archivo a cloudinary
        const cloudinary = require('cloudinary').v2;
        cloudinary.config({
            cloud_name: "derd50bql",
            api_key: "149897356334735",
            api_secret: "eq6PWmskRHl6wrkDxg61VIIBKxQ"
        });

        const path = req.file.path;
        const now = new Date().toISOString()

        const filename = 'tercerParcial' + "/" + now;

        cloudinary.uploader.upload(
            path, { public_id: filename, tags: 'tercerParcial' },
            (err, img) => {
                if (err) {
                    return res.send(err);
                }
                console.log('file uploaded to Cloudinary');

                // remove file from server
                const fs = require('fs');
                fs.unlinkSync(path);

                const urlPhoto = img.secure_url;

                res.render('cloudinary/showImage', {
                    imgUrl: urlPhoto
                });

                //res.json(img);
            }
        );
    });
});

module.exports = router;