/**
 * Model for comments.
 *
 * @author tim.tang
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    comment_id: {
        type: ObjectId,
        index: true
    },
    user_id: {
        type: ObjectId
    },
    card_id: {
        type: ObjectId
    },
    star: {
        type: Number,
        default: 0
    },
    content: {
        type: String
    },
    update_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Comment', CommentSchema);
