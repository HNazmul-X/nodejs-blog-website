const PostModel = require("../../models/PostModel");

exports.likePostController = async (req, res, next) => {
    const { postId } = req.params;
    console.log(postId)
    let liked = null;
    
    if (!req.user) {
        return res.status(401).json({ massage: "You are not an authenticated user" });
    }
    const userId = req.user._id;

    try {
        const post = await PostModel.findById(postId);

        if (post.dislikes.includes(userId)) {
            await PostModel.findOneAndUpdate(
                { _id: postId },
                {
                    $pull: {
                        dislikes: userId,
                    },
                },
            );
        }

        if (post.likes.includes(userId)) {
            await PostModel.findOneAndUpdate(
                { _id: postId },
                {
                    $pull: {
                        likes: userId,
                    },
                },
            );
            liked = false;
        } else {
            await PostModel.findOneAndUpdate(
                { _id: postId },
                {
                    $push: {
                        likes: userId,
                    },
                },
            );
            liked = true;
        }

        const updatedPost = await PostModel.findById(postId);
        res.status(200).json({
            liked,
            totalLikes: updatedPost.likes.length || 0,
            totalDislikes: updatedPost.likes.dislikes || 0,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            massage: "Internel Server Error",
        });
        next(e);
    }
};

exports.dislikesPostController = async (req, res, next) => {
    const { postId } = req.params;
    let disliked = null;
    
    if (!req.user) {
        return res.status(401).json({ massage: "You are not an authenticated user" });
    }
    const userId = req.user._id;


    try {
        const post = await PostModel.findById(postId);

        if (post.likes.includes(userId)) {
            await PostModel.findOneAndUpdate(
                { _id: postId },
                {
                    $pull: {
                        likes: userId,
                    },
                },
            );
        }

        if (post.dislikes.includes(userId)) {
            await PostModel.findOneAndUpdate(
                { _id: postId },
                {
                    $pull: {
                        dislikes: userId,
                    },
                },
            );
            disliked = false;
        } else {
            await PostModel.findOneAndUpdate(
                { _id: postId },
                {
                    $push: {
                        dislikes: userId,
                    },
                },
            );
            disliked = true;
        }

        const updatedPost = await PostModel.findById(postId);

        res.status(200).json({
            disliked,
            totalDislikes: updatedPost.dislikes.length || 0,
            totalLikes: updatedPost.likes.length || 0,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            massage: "Internel Server Error",
        });
        next(e);
    }
};
