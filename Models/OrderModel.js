const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const OrderSchema = new Schema({
    userId: {
        type: String,
        required: [true, "this field is required "],
    },
    items: [{
        itemName: {
            type: String,
            required: [true, "this field is required "]
        },
        count: {
            type: Number,
            required: [true, "this field is required "]
        }
    }],
    client: {
        clientName: {
            type: String,
            required: [true, "this field is required "]
        },
        roomName: {
            type: String,
            required: [true, "this field is required "]
        }
    },
    isGust: {
        type: Boolean,
        required: [true, "this field is required "]
    },
    note: {type: String},
    status: {
        type: Number,
        default: 0

        //    0=Loading
        //    1=underway
        //    2=done
    },
    date: {
        type:Date,
        default: Date.now
    },
    time:{
        type:String,
        required:true
    }
})
OrderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Order', OrderSchema)
