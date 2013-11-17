/**
 * Handle user api invoke.
 *
 * @author tim.tang
 */

var constants = require('../common/constants'),
    _ = require('underscore');

var UserHandler = function UserHandler() {
    console.log('User Handler initialized.');
};


_.extend(UserHandler.prototype, {

    saveUser: function(){
        console.log('user saved!');
    }
});

var userHandler = new UserHandler();
module.exports = userHandler;
