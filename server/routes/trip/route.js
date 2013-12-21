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

'use strict';

/* node API routes for trip */
function setup(app, handlers){

    app.post('/api/trip', handlers.trip.save);
    app.get('/api/trip', handlers.trip.getAll);
    app.put('/api/trip', handlers.trip.update);
    app.delete('/api/trip/:name', handlers.trip.remove);
};

module.exports.setup = setup;