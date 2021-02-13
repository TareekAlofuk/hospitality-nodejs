const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
})
ItemSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Item', ItemSchema)
