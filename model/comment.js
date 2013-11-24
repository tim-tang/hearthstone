/**
 * Model for comments.
 *
 * @author tim.tang
 */

// Model for Comment.
// --------------
"use strict";
module.exports = function(mongoose) {

    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;

    var commentSchema = new Schema({

        user_id: {
            type: ObjectId,
            index: true
        },
        card_id: {
            type: ObjectId,
            index: true
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
    return commentSchema;
};
