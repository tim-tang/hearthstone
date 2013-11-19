/**
 * Configuration class for hearthstone server.
 *
 * @author tim.tang
 */

exports.config = {
    mongo: 'mongodb://127.0.0.1/hearthstone_dev',
    session_secret: 'hearthstone_srv',
    auth_cookie_name: 'hearthstone_srv'
};
