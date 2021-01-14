const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:admin@clustertest.kv5vu.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB Connection : ' + err)
    }
});

require('./employee.model');
require('./tutorial.model');
require('./comment.model');