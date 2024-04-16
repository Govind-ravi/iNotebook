const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true,
        default: "Title"
    },
    description:{
        type: String,
        default: ""
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('NotesOfUser', UserSchema)