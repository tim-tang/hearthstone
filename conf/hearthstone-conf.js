/**
 * Configuration class for hearthstone server.
 *
 * @author tim.tang
 */

exports.config = {
    // MongoDB configure
    mongo: 'mongodb://127.0.0.1/hearthstone_dev',

    // Session and Auth cookie configure
    session_secret: 'hearthstone_srv',
    auth_cookie_name: 'hearthstone_srv',

    // Hearthstone server configure
    dev_hearthstone_host: '127.0.0.1',
    dev_hearthstone_port: 5000,
    pro_hearthstone_host: 'http://hearthstone-srv.herokuapp.com',
    pro_hearthstone_port: 80,

    // Http header
    content_type: 'application/json'
};
