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
var TripRepository = require('../repositories/tripRepository');
var tripRepository = new TripRepository();

var TripHandler = function () {

    this.save = handleCreateRequest;
    this.getAll = handleGetRequest;
    this.update = handleUpdateRequest;
    this.remove = handleDeleteRequest;
};

/* event definition to save trip data */
function handleCreateRequest(request, response) {

    tripRepository.save(request.body)
	    .then(function (promise) {
		    logger.log('success: ', 'data saved');
		    response.json(201, promise);
		},
		function (error) {
		    logger.log('error: ', error.stack);
		    response.json(400, { error: error.message });
		}
	);
}

/* event definition for get all trip information */
function handleGetRequest(request, response) {

    tripRepository.getAll()
        .then(function (promises) {
            logger.log('success: ', 'data fetched');
            return response.json({ results: JSON.parse(promises) });
        },
        function (err) {
            logger.log('error: ' + err, 'pass');
            response.json(400, { error: error.message });
        }
    );
}

/* event definition to update trip data */
function handleUpdateRequest(request, response) {

    tripRepository.update(request.body)
	    .then(function () {
		    logger.log('success: ', 'data updated');
		    response.json(201, null);
		},
		function (error) {
		    logger.log('error: ', error.stack);
		    response.json(400, { error: error.message });
		}
	);
}

/* event definition to delete trip details*/
function handleDeleteRequest(request, response) {

    tripRepository.remove(request.params.name)
        .then(function (promise) {
            logger.log('success', 'data deleted');
            return response.json({ results: JSON.parse(promise) });
        },
        function (error) {
            logger.log('error:', error.stack);
            response.json(400, { error: error.message });
        }
    );
}

module.exports = TripHandler;

