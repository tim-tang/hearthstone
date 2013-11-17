/**
 * Handle user api invoke.
 *
 * @author tim.tang
 */

var constants = require('../common/constants'),
    _ = require('underscore');
    userService = require('../service').UserService;

var UserHandler = function UserHandler() {
    console.log('User Handler initialized.');
};


_.extend(UserHandler.prototype, {

    saveUser: function(req, res){
        var user = req.body || null;
        var deviceToken = req.params[constants.REST_PARAM_DEVICE_TOKEN] || null;
        userSerivce.save(user, function(reply){
           if(reply){
                console.log('Save user success.');
           }else{
                console.log('Save user failure.');
                //TODO:
           }
        });
    }
});

var userHandler = new UserHandler();
module.exports = userHandler;
