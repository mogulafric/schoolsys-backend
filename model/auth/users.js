const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        required: [true, 'User name is required']
    },
    email:{
        type:String,
        required:true
    },
    roles: {
        User: {
            type: Number,
            default: 1000
        }  
    },
    password: {
        type: String,
        required: true
    },
    passwordConfirm:{
        type:String,
        required:true
    },
    count:{type:Number,
        requred:true},
    refreshToken: [String]
});

module.exports = mongoose.model('User', userSchema);