require('./config/config');

const express = require('express');
// Using Node.js `require()`
const mongoose = require('mongoose')
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Configuracion global de rutas
app.use(require('./rutas/index'));


mongoose.connect(process.env.URLDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    (err, res) => {

        if (err) throw err;

        console.log('Base de datos conectada!')
    });

app.listen(process.env.PORT, () => {
    console.log("escuchando puerto: " + process.env.PORT);
});