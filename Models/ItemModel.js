const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ItemSchema = new Schema({
    itemName: {
        type: String,
        required: [true , "this field is required "],
        unique: true
    },
    type: {
        type: String,
        required: [true , "this field is required "],
    },
    image: {
        type: String,
        required: [true , "this field is required "],
    },
    isActive: {
        type: Boolean,
        required: [true , "this field is required "],
    }
})
ItemSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Item', ItemSchema)
