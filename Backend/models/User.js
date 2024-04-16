const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
});
const User = mongoose.model('NootbookUser', UserSchema)
// User.createIndexes(); //to make sure unique key is not repeated due to express validator
module.exports = User
