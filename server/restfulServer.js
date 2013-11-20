/**
 * Express server wrapper.
 *
 * @author tim.tang
 */

var _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    application_root = path.resolve(__dirname, '..'),
    constants = require('../common/constants'),
    config = require('../conf/hearthstone-conf').config,
    express = require('express'),
    auth = require('../middleware/authenticator'),
    handlers = require('../handler'),
    userHandler = require('../handler/userHandler'),
    app = express(),
    restAPI;

/**
 * Express router constructor.
 */
var RESTfulServer = function RESTfulServer() {
        restAPI = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../conf/api-router.json'), 'UTF-8'));
    };


/**
 * Do Express server configuration.
 *
 */
function doConf() {
    app.use(express.favicon());
    app.use(express.logger(constants.EXPRESS_ENV_DEV));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: config.session_secret
    }));
    app.use(userHandler.authenticate);
    app.use(app.router);
    app.use(express.static(path.join(application_root, constants.EXPRESS_PUBLIC)));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
}

/**
 *
 * Register RESTful API routes.
 *
 * @param {URLOption} options for rest api configuration.
 *
 */
function registerAPI(routers) {
    _.each(routers, function(router) {
        _.each(handlers, function(handler) {
            if (_.isFunction(handler[router.api]) && _.isString(router.url)) {
                console.log('Registering API-[%s] URL-[%s] METHOD-[%s]', router.api, router.url, router.method);
                var middlewares = [];
                if(router.middleware || _.isFunction(auth[router.middleware])){
                    middlewares.push(auth[router.middleware]);
                }
                switch (router.method) {

                case constants.ROUTER_METHOD_POST:
                    app.post(router.url, middlewares, function(req, res, next) {
                        res.contentType(constants.CONTENT_TYPE);
                        handler[router.api](req, res, next);
                    });
                    break;

                case constants.ROUTER_METHOD_PUT:
                    app.put(router.url, function(req, res) {
                        res.contentType(constants.CONTENT_TYPE);
                        handler[router.api](req, res);
                    });
                    break;

                case constants.ROUTER_METHOD_GET:
                    app.get(router.url, middlewares, function(req, res, next) {
                        res.contentType(constants.CONTENT_TYPE);
                        handler[router.api](req, res, next);
                    });
                    break;

                case constants.ROUTER_METHOD_DELETE:
                    app.del(router.url, function(req, res) {
                        res.contentType(constants.CONTENT_TYPE);
                        handler[router.api](req, res);
                    });
                    break;

                default:
                    console.log('The METHOD-[%s] not supported!', router.method);
                }
            } else {
               // console.log('Invalid API-[%s] or URL-[%s] in api-router.json!', router.api, router.url);
            }
        });
    });
}

_.extend(RESTfulServer.prototype, {

    startup: function() {
        doConf();
        registerAPI(restAPI.routers);
        var port = process.env.PORT || constants.EXPRESS_PORT;
        app.listen(port, function() {
            console.log('Hearthstone server listening on port::%s', port);
        });
    }
});

var restfulServer = new RESTfulServer();

restfulServer.startup();

/* Public RESTful Server */
module.exports = restfulServer;
