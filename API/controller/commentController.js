const CommentModel = require("../../models/CommentModel");
const PostModel = require("../../models/PostModel");

exports.commentPostController = async (req, res, next) => {
    const { postId } = req.params;
    const { body } = req.body;

    if (!req.user) {
        return res.status(500).json({ massage: "you are not an authenticated user" });
    }

    try {
        const createdComment = await new CommentModel({
            user: req.user._id,
            post: postId,
            body,
            replies: [],
        }).save();

        await PostModel.findOneAndUpdate(
            { _id: postId },
            {
                $push: {
                    comments: createdComment._id,
                },
            },
        );

        const commentJSON = await CommentModel.findOne({ _id: createdComment._id }).populate({
            path: "user",
            select: "profilePic username",
        });

        res.json(commentJSON);
    } catch (e) {
        console.log({commentError : e})
        next()
    }

};

exports.replyCommentPostController = async (req, res, next) => {
    const {commentId} = req.params
    const {body} = req.body

    if(!req.user){
      return  res.status(401).json({massage:"You are not an authenticated user"})
    }

    const reply = {
        user:req.user._id,
        body
    }

    try {
        
        await CommentModel.findOneAndUpdate(
            { _id: commentId },
            {
                $push: {
                    replies: reply
                },
            },
        );

        res.status(200).json({
            ...reply,
            profilePic:req.user.profilePic,
            username :req.user.username
        })

    } catch (e) {
        console.log(e)
        next()
    }
}
