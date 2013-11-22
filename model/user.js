/**
 * User model for mongod sechema.
 *
 * @author tim.tang
 */

// Model for User.
// --------------
module.exports = function(mongoose) {

    var Schema = mongoose.Schema;
    var ObjectId = Schema.ObjectId;

    var userSchema = new Schema({
        name: {
            type: String,
            index: true
        },
        email: {
            type: String
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
    return userSchema;
};
