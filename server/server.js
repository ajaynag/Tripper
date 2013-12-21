/*
 Tripper
 ----------------------
 Author:         Nagendra Dwarakinath
 Created Date:   21st Dec 2013
 Purpose:

 Supported By:
 Reviewed By:

 Update History
 -------------------------------------------------------------------------------
 Name(developer name)        Date (updated date)     Purpose (description)

 */

/* variable declaration */
var express = require('express');
var app = express();
var port = 1234;
var fs = require('fs');
var route = require('./routes/trip/route');
var tripHandler = require('./modules/trip/handlers/tripHandler');
var expressLogFile = fs.createWriteStream('./logs/express.log', { flags: 'a' });

/* instance of a trip handler */
var trip = new tripHandler();

/* app configuration */
app.configure(function () {

    app.use(express.logger({ stream: expressLogFile }));
    app.use(express.bodyParser({ uploadDir: './uploads' }));
    app.use(express.methodOverride());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", 'http://localhost:7777');
        res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        next();
    });

    app.use('/sampleData',express.static(__dirname + '/sampleData'));
    app.use(app.router);

    app.use(express.static(__dirname + '/public'));

});

/* instance of a trip handler */
var handlers = { trip: trip};

route.setup(app, handlers);
app.listen(port);
console.log("Express server listening on port: ", port);

module.exports = app;