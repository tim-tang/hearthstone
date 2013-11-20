/**
 * User model for mongod sechema.
 *
 * @author tim.tang
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
    name: {
        type: String,
        index: true
    },
    email: {
        type: String,
        unique: true
    },
    pass: {
        type: String
    },
    avatar: {
        type: String
    },
    deviceToken: {
        type: String
    },
    favorites: [{
        card_id: ObjectId
    }],
    update_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('User', UserSchema);
