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
        unique: true

    },
    password: {
        type: String,
        required: [true , "this field is required "],
    },
    permissions: {
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


// static method to login user
AdminSchema.statics.login = async function(email , password) {
    const admin = await  this.findOne({email});
    if (admin){
        const auth = await bcrypt.compare(password , admin.password)
        if (auth){
            console.log(auth)
            return admin ;
        }
    throw Error('incorrect password')
    }
    throw Error('incorrect email')
}
module.exports = mongoose.model('Admin', AdminSchema)
