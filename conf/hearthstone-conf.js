/**
 * Configuration class for hearthstone server.
 *
 * @author tim.tang
 */

// Hearthstone main configruation.
// --------------

exports.config = {
    // MongoDB configuration
    mongo: 'mongodb://127.0.0.1/hearthstone_dev',

    // Session and Auth cookie configuration
    session_secret: 'hearthstone_srv',
    auth_cookie_name: 'hearthstone_srv',

    // Hearthstone server configuration
    DEV_HEARTHSTONE_HOST: '127.0.0.1',
    DEV_HEARTHSTONE_PORT: 5000,
    PROD_HEARTHSTONE_HOST: 'hearthstone-srv.herokuapp.com',
    PROD_HEARTHSTONE_PORT: 80,
    HEARTHSTONE_ENV: 'dev',
    HEARTHSTONE_PUBLIC_FOLDER: 'docs',

    // Http methods and heards
    CONTENT_TYPE: 'application/json',
    ROUTER_METHOD_POST: 'POST',
    ROUTER_METHOD_GET: 'GET',
    ROUTER_METHOD_DELETE: 'DELETE',
    ROUTER_METHOD_PUT: 'PUT',


    // Administrator user configuration.
    admins: {
        tim: true
    }
};
