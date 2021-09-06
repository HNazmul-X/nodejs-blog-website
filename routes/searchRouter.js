const { searchGetController } = require("../controllers/searchController")
const searchRouter = require("express").Router()

searchRouter.get("/", searchGetController)


module.exports = searchRouter