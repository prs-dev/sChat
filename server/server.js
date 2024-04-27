const express = require('express')
require('dotenv').config()
const cookieParser = require("cookie-parser")

const connectDB = require('./connectDB')
const authRoutes = require('./routes/authRoutes')
const messageRoutes = require('./routes/messageRoutes')
const userRoutes = require('./routes/userRoutes')

const {app, server} = require("./socket/socket")

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/message', messageRoutes)
app.use('/api/user', userRoutes)

server.listen(PORT, () => {
    connectDB()
    console.log("server is running...")
})