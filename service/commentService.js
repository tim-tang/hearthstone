/**
 * Comment manage service.
 *
 * @author tim.tang
 */

var model = require('../model'),
    Comment = model.Comment,
    _ = require('underscore');


var CommentService = function CommentSerice(){};

_.extend(CommentService.prototype, {



});

var commentService = new CommentService();

/** public comment module **/
module.exports = commentService;
