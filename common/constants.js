/**
 * Hearthstone constants.
 *
 * @author tim.tang
 */

/**
 * Constants definition.
 *
 * @param {String} key
 * @param {String} value
 */
function define(key, value) {
    Object.defineProperty(exports, key, {
        value: value,
        enumerable: true
    });
}

// ------- Constants For Express App Server -------------//
define('EXPRESS_PORT', 5000);
define('EXPRESS_HOST', 'localhost');
define('EXPRESS_ENV_DEV', 'dev');
define('EXPRESS_PUBLIC', 'public');
define('CONTENT_TYPE', 'application/json');

// ------- Constants For App Server Deployment -------------//
define('NODE_ENV_PRODUCTION', 'production');
define('NODE_ENV_DEVELOPMENT', 'development');

// ------- Constants For Restful API Router -----------//
define('ROUTER_METHOD_POST', 'POST');
define('ROUTER_METHOD_GET', 'GET');
define('ROUTER_METHOD_DELETE', 'DELETE');
define('ROUTER_METHOD_PUT', 'PUT');
