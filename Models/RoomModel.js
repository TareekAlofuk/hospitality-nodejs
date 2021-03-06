const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const RoomSchema = new Schema({
    name: {
        type: String,
        required: [true , "this field is required "],
        unique: true
    }
})
RoomSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Room', RoomSchema)
