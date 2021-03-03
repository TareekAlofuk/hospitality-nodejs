const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ItemSchema = new Schema({
    itemName: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
})
ItemSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Item', ItemSchema)
