const { isAuthenticate } = require("../../middleware/authMiddleware")
const { commentPostController } = require("../controller/commentController")

const apiRouter = require("express").Router()

apiRouter.post("/comment/:postId", isAuthenticate, commentPostController)
apiRouter.post("/comment/reply/:commentId", isAuthenticate)

module.exports = apiRouter