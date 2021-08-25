const { dashboardGetController, createProfileGetController, createProfilePostController, editProfileGetController, editProfilePostController } = require("../controllers/dashboardController")
const { isAuthenticate } = require("../middleware/authMiddleware")
const profileValidator = require("../validator/dashboard/profileValidator")

const dashboardRoutes = require("express").Router()


dashboardRoutes.get("/",isAuthenticate, dashboardGetController)

//create profile 
dashboardRoutes.get("/create-profile",isAuthenticate, createProfileGetController)
dashboardRoutes.post("/create-profile",isAuthenticate,profileValidator, createProfilePostController)

//create profile 
dashboardRoutes.get("/edit-profile",isAuthenticate, editProfileGetController)
dashboardRoutes.post("/edit-profile",isAuthenticate,profileValidator, editProfilePostController)

module.exports = dashboardRoutes