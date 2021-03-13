const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')
const AdminSchema = new Schema({
    name: {
        type: String,
        required: [true , "this field is required "]
    },
    email: {
        type: String,
        required: [true , "this field is required "],
        unique: [true , "this field should be  uniq "]

    },
    password: {
        type: String,
        required: [true , "this field is required "],
    },
    permitions: {
        operations: {type: Boolean,default:false},
        reports: {type: Boolean ,default:false},
        inventory: {type: Boolean ,default:false},
        superAdmin: {type: Boolean ,default:false},
    }
})
AdminSchema.plugin(uniqueValidator);
AdminSchema.pre('save' , async function (next){
    const salt = await bcrypt.genSalt();
    this.password  = await  bcrypt.hash(this.password , salt);
    next();
})
module.exports = mongoose.model('Admin', AdminSchema)
