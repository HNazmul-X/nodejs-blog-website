const { postGetController, postPostController } = require("../controllers/postController");
const { isAuthenticate } = require("../middleware/authMiddleware");
const createPostValidator = require("../validator/dashboard/createPostValidator");
const postRouter = require("express").Router()

postRouter.get("/create-post",isAuthenticate, postGetController )
postRouter.post("/create-post",[isAuthenticate,createPostValidator], postPostController)

module.exports = postRouter;