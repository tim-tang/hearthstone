/**
 * Rest api authenticator.
 *
 * @author tim.tang
 */

exports.userRequired = function(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.send({
            success: false,
            msg: '403 User not authroized!'
        });
    }
    next();
};

exports.adminRequired = function(req, res, next) {
    if (!req.session || !req.session.user || !req.session.user.is_admin) {
        return res.send({
            success: false,
            msg: '403 Admin user required!'
        });
    }
    next();
};
