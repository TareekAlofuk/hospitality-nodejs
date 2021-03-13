const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const ItemTypeSchema = new Schema({
    name: {
        type: String,
        required: [true , "this field is required "],
        unique: true
    }
})
ItemTypeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('ItemType', ItemTypeSchema)
