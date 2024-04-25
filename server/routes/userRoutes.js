const { protectRoute } = require('../middlewares/protectRoute')
const {getUsers} = require("../controllers/user.controller")

const router = require('express').Router()

router.get('/', protectRoute, getUsers)

module.exports = router
