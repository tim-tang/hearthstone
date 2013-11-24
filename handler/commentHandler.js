/**
 * Manage comment apis.
 *
 * @author tim.tang
 */

// Hearthstone Comment Handler.
// --------------

"use strict";

var sanitize = require('validator').sanitize,
    check = require('validator').check,
    commentService = require('../service/commentService'),
    _ = require('underscore');


var CommentHandler = function CommentHandler() {};

_.extend(CommentHandler.prototype, {

    // Retrieve card related comments.
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

    // Star comments.
    star: function(req, res, next) {
        var commentId = sanitize(req.body.commentId).trim();
        var star = sanitize(req.body.star).trim();
        commentService.star(commentId, star, function(err) {
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

    // Create a comment on related card.
    createComment: function(req, res, next) {
        var userId = sanitize(req.body.userId).trim();
        var cardId = sanitize(req.body.cardId).trim();
        var content = sanitize(req.body.content).trim();
        commentService.saveComment(userId, cardId, content, function(err, comment) {
            if (err) {
                return res.send({
                    success: false,
                    msg: err.message
                });
            }
            res.send({
                success: true,
                comment: comment
            });
        });
    }
});

var commentHandler = new CommentHandler();
module.exports = commentHandler;
