const mongoose = require("mongoose")

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("db connected")
    } catch (error) {
        console.log("Error connecting to db", error)
    }
}

module.exports = connectDB