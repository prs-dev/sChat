const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const generateCookie = require('../utils/generateToken')

const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body

        if (password !== confirmPassword) return res.status(400).json({ error: "Passwords do not match!" })

        const user = await User.findOne({ username })

        if (user) return res.status(400).json({ error: "User exists!" })

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            profilePic: gender === 'male' ? boyProfilePic : girlProfilePic,
            gender
        })

        if (newUser) {
            //generate token
            generateCookie(newUser._id, res)

            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                fullName: newUser.fullName,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({error: "Invalid user data"})
        }


    } catch (error) {
        console.log("Error in signup controller", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '')
        if(!user || !isPasswordCorrect) {
            return res.status(400).json({error: 'Invalid username or password'})
        }

        generateCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
            profilePic: user.profilePic
        })
    } catch (error) {
        console.log("Error in login controller", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

const logout = async (req, res) => {
    try {
        res.cookie("jwt", '', {maxAge: 0})
        res.status(200).json({message: "Logged out successfully "})
    } catch (error) {
        console.log("Error in logout controller", error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}


module.exports = {
    signup,
    login,
    logout
}