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


var mongoose = require('mongoose');

var tripSchema = mongoose.Schema({
    UserId: {type: String, required: true, index: {unique: true}},
    UserName: {type: String, required: true},
    StartLocation: {type: String, 'default': null},
    StartTime: {type: String, 'default': null},
    StopTime: {type: String, 'default': null},
    StartAddress: {type: String, 'default': null},
    StopAddress: {type: String, 'default': null},
    TripData: {type: String, 'default': null}
});

var tripModel = mongoose.model('TripModel', tripSchema);

module.exports = tripModel;
