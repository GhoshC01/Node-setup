"use strict";
const express = require('express');
const body_parser = require('body-parser');
const route = require('./controller');
const cors = require('cors');
const path = require('path');
const app = express();
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swagger_option = require('./config/swagger_options.json').options;
swagger_option.apis = ['./doc/**/*.yaml'];
const specs = swaggerJsdoc(swagger_option);

const statusTwoHundred = 200;
const statusFiveHundred = 500;
const model = require('./model');

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.status(statusTwoHundred).send('ok');
});
app.get('/errorHandelerRoot', function(req, res, next) {
    next(new Error('whoops!'))
});
app.use(
    "/api/v1/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
app.use(body_parser.urlencoded({
    limit: '50mb',
    extented: true
}));
app.use(body_parser.json({ limit: '50mb', extented: true }));
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use(express.static(__dirname + '/public'));

app.use('/static', express.static('uploads'));

app.use(function(err, req, res, next) {
    res.status(statusFiveHundred).send('Somthing broke !');
});

route(app);

process.on('uncaughtException', function(err) {
    console.log('Ucaught excepttion', err);
});

console.log("Syncing database...");

model.sequelize.sync({
    logging: false,
    alter: true
}).then(function() {
    console.log("Starting up server....");
    app.listen(3000,()=> {
        console.log('Lisenting at port 3000')
    });
});

module.exports = app;