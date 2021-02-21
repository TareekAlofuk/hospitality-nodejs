const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const AdminSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true
    },
    permitions: {
        operations: {type: Boolean,default:false},
        reports: {type: Boolean ,default:false},
        inventory: {type: Boolean ,default:false},
        superAdmin: {type: Boolean ,default:false},
    }
})
AdminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin', AdminSchema)
