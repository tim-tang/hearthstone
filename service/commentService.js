// Comment manage service.
// --------------

"use strict";
var model = require('../model'),
    Comment = model.Comment,
    userService = require('../service').UserService,
    EventProxy = require('eventproxy'),
    _ = require('underscore');


var CommentService = function CommentSerice() {};

_.extend(CommentService.prototype, {

    // Retrieve comments by card id.
    getCommentsByCardId: function(cardId, callback) {
        Comment.find({
            card_id: cardId
        }, function(err, comments){
            if(err){
                callback(err);
            }
            var ep = new EventProxy();
            ep.after('user_retrieved', comments.length, function(replies){
                return callback(err, replies);
            });
            _.each(comments, function(comment){
                if(comment.user_id){
                    userService.getUserById(comment.user_id, function(err, user){
                        if(err){
                            return callback(err);
                        }
                        comment.user = user;
                        ep.emit('user_retrieved', comment);
                    });
                }
            });
        });
    },

    // Star one comment.
    star: function(id, star, callback) {
        Comment.findOne({
            _id: id
        }, function(err, comment) {
            if (err) {
                callback(err);
            }
            if (!comment) {
                callback(new Error('Comment not exists!'));
            }
            comment.star = star;
            comment.save(callback);
        });
    },

    // Save one comment.
    saveComment: function(userId, cardId, content, callback) {
        var comment = new Comment();
        comment.user_id = userId;
        comment.card_id = cardId;
        comment.content = content;
        comment.save(function(err){
            callback(err, comment);
        });
    }
});

var commentService = new CommentService();

/** public comment module **/
module.exports = commentService;
