const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const OrderSchema = new Schema({
    userId:{type:String},
    items: [{
        itemName: {type: String, required: true},
        count: {type: Number, required: true}
    }],
    client: {
        clientName: {type: String, required: true},
        roomName: {type: String, required: true}
    },
    isGust: {
        type: Boolean,
        required: true
    },
    note: {type: String},
    status:{
        type:Number ,
        default:0

    //    0=Loading
    //    1=underway
    //    2=done
    },
    date: {
        type: Date,
        default: Date.now
    }
})
OrderSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Order', OrderSchema)
