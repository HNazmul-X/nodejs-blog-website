const { isAuthenticate } = require("../../middleware/authMiddleware")
const { bookmarkPostController } = require("../controller/bookmarkController")
const { commentPostController, replyCommentPostController } = require("../controller/commentController")
const { likePostController, dislikesPostController } = require("../controller/likeAndDislikeController")

const apiRouter = require("express").Router()

apiRouter.post("/comment/:postId", isAuthenticate, commentPostController)
apiRouter.post("/comment/reply/:commentId", isAuthenticate, replyCommentPostController)

apiRouter.post("/like/:postId", isAuthenticate, likePostController)
apiRouter.post("/dislike/:postId", isAuthenticate, dislikesPostController)

apiRouter.post("/bookmarks/:postId", isAuthenticate, bookmarkPostController)



module.exports = apiRouter