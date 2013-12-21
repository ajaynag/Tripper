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

(function () {
    'use strict';

    /* variable declaration */
    var config = require('./config-debug');
    var winston = require('winston');
    var server = require('./server');

    winston.add(winston.transports.File, {
        filename: config.logger.api
    });

    winston.handleExceptions(new winston.transports.File({
        filename: config.logger.exception
    }));

}());