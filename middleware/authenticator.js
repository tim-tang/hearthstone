/**
 * Rest api authenticator.
 *
 * @author tim.tang
 */

exports.userRequired = function(req, res, next) {
   // if (!req.session || !req.session.user) {
   //     return res.send({
   //         success: false,
   //         msg: '403 User not authroized!'
   //     });
   // }
    next();
};
