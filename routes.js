/**
* Main application routes
*/

'use strict';

module.exports = function(app) {

    // Insert routes below
    app.use('/api/users', require('./api/user'));
    //app.use('/api/userApis', require('./api/api'));
    app.route('/*').get(function(req,res){
        res.status(404).send('Not found');
    });

};
