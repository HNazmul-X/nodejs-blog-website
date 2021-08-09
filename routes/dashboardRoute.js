const { dashboardGetController } = require("../controllers/dashboardController")
const { isAuthenticate } = require("../middleware/authMiddleware")

const dashboardRoutes = require("express").Router()


dashboardRoutes.get("/",isAuthenticate, dashboardGetController)

module.exports = dashboardRoutes