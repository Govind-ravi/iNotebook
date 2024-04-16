const mongoose = require('mongoose')
const mongoUri = "mongodb://localhost:27017/iNotebook"

const connectMongoose = () => {
    try {
        mongoose.set("strictQuery", false)
        mongoose.connect(mongoUri);
        console.log("Connection with mongodb succsesful");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectMongoose;