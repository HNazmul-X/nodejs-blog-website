const { userGetController } = require("../controllers/userController")
const userRoute = require("express").Router()

userRoute.get("/:userId", userGetController)


module.exports = userRoute