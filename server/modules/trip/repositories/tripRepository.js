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

var logger = require('../../../utils/logger');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Tripper');
//mongoose.connect('mongodb://tripper:tripper@ds061148.mongolab.com:61148/tripper');
var tripModel = require('../../../model/trip/tripModel');
var Q = require('q');

function TripRepository() {

	this.save = saveTripDetails;
    this.getAll = getTripDetails;
    this.update = updateTripDetails;
    this.remove = deleteTripDetails;
}

/* function definition to save trip data */
function saveTripDetails(data) {

	var deferred = Q.defer();
    var tripDetails = new tripModel({
        UserId: data.UserId,
        UserName: data.UserName,
        StartLocation: data.StartLocation,
        StartTime: data.StartTime,
        StopTime: data.StopTime,
        StartAddress: data.StartAddress,
        StopAddress: data.StopAddress,
        TripData: data.TripData
    });

    tripDetails.save(function(err, res) {
		if (err) {
            logger.log('error: ', err);
			deferred.reject(new Error(err));
		}
		else {
            logger.log("success: " + 'data saved');
			deferred.resolve(res);
		}
	});

	return deferred.promise;
}

/* function definition to get all trip information */
function getTripDetails() {

    var deferred = Q.defer();

    tripModel.find({}, function(err, data) {
        if (err) {
            logger.log('error: ', 'failed to fetch data');
            deferred.reject(new Error(err));
        }
        else {
            logger.log('success: ', 'data fetched');
            deferred.resolve((JSON.stringify(data)));
        }
    });

    return deferred.promise;
}

/* function definition to update trip data */
function updateTripDetails(data) {

    var deferred = Q.defer();
    var tripDetails = new TripModel({
        UserId: data.UserId,
        UserName: data.UserName,
        StartLocation: data.StartLocation,
        StartTime: data.StartTime,
        StopTime: data.StopTime,
        StartAddress: data.StartAddress,
        StopAddress: data.StopAddress,
        TripData: data.TripData
    });

    var tripDetailsTemp = tripDetails.toObject();
    delete tripDetailsTemp._id;
    delete tripDetailsTemp.UserId;

    tripModel.update({ UserId: data.UserId }, tripDetailsTemp, { multi: false }, function (err, res) {
        if (err) {
            logger.log('error: ', err);
            deferred.reject(new Error(err));
        }
        else {
            logger.log("success: " + 'data updated');
            deferred.resolve(res);
        }
    });

    return deferred.promise;
}

/* function definition to delete trip data*/
function deleteTripDetails(data) {

    var deferred = Q.defer();

    tripModel.remove({ UserId: data }, function (err, res) {
        if (err) {
            logger.log('error:', err);
            deferred.reject(new Error(err));
        } else {
            logger.log("success: " + 'data deleted');
            deferred.resolve(res);
        }
    });

    return deferred.promise;
}

module.exports = TripRepository;
