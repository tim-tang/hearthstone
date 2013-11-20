/**
 * Comment manage service.
 *
 * @author tim.tang
 */

var model = require('../model'),
    Comment = model.Comment,
    _ = require('underscore');


var CommentService = function CommentSerice() {};

_.extend(CommentService.prototype, {

    star: function(id, callback) {
        Comment.findOne({
            _id: id
        }, function(err, comment) {
            if (err) {
                callback(err);
            }
            if (!comment) {
                callback(new Error('Comment not exists!'));
            }
            comment.star++;
            comment.save(comment, callback);
        });
    },

    saveComment: function(userId, cardId, content, callback) {
        var comment = new Comment();
        comment.user_id = userId;
        comment.card_id = cardId;
        comment.content = content;
        Comment.save(comment, callback);
    }
});

var commentService = new CommentService();

/** public comment module **/
module.exports = commentService;
