/**
 * Version card id schema.
 *
 * @author tim.tang
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CardIdSchema = new Schema({
    card_id: {
        type: ObjectId,
        unique: true
    }
});

mongoose.model('CardId', CardIdSchema);
