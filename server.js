require('./models/db');

// Complementos
const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const port = process.env.PORT || 3000;

// Controladores
const employeeController = require('./controllers/employeeController');
const mainController = require('./controllers/mainController');

// Iniciamos aplicación
var app = express();

// Posts como json
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

// Establecemeos vista predeterminada
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

// Encendemos server
app.listen(port, () => {
    console.log('Express server started at port: 3000');
});

// Registramos rutas
app.use('/employee', employeeController);
app.use('/', mainController);