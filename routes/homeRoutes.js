const { homeGetController } = require("../controllers/homeController")
const homeRouter = require("express").Router()

homeRouter.get("/", homeGetController)


module.exports = homeRouter