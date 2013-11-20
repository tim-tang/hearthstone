/**
 * Manage comment apis.
 *
 * @author tim.tang
 */

var sanitize = require('validator').sanitize,
    check = require('validator').check,
    commentService = require('../service/commentService'),
    _ = require('underscore');


var CommentHandler = function CommentHandler() {};

_.extend(CommentHandler.prototype, {

    showComments: function(req, res, next) {
        var cardId = sanitize(req.params['cardId']).trim();
        commentService.getCommentsByCardId(cardId, function(err, comments) {
            if (err) {
                return res.send({
                    success: false,
                    msg: err.message
                });
            }
            res.send({
                success: true,
                comments: comments
            });
        });
    },

    star: function(req, res, next) {
        var commentId = sanitize(req.params['commentId']).trim();
        commentService.star(commentId, function(err) {
            if (err) {
                return res.send({
                    success: false,
                    msg: err.message
                });
            }
            res.send({
                success: true,
                msg: 'Star comment success!'
            });
        });
    },

    createComment: function(req, res, next) {
        var userId = sanitize(req.body.userId).trim();
        var cardId = sanitize(req.body.cardId).trim();
        var content = sanitize(req.body.content).trim();
        commentService.saveComment(userId, cardId, content, function(err) {
            if (err) {
                return res.send({
                    success: false,
                    msg: 'Create comment failure.'
                });
            }
            res.send({
                success: true,
                msg: 'Create comment success'
            });
        });
    }
});

var commentHandler = new CommentHandler();
module.exports = commentHandler;
