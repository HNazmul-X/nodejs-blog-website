const ProfileModel = require("../../models/ProfileModel");

exports.bookmarkPostController = async (req, res, next) => {
    const { postId } = req.params;
    let bookmarked = null;

    if (!req.user) {
        return res.status(401).json({ massage: "You are not an authenticated user" });
    }

    const userId = req.user._id;

    try {
        const profile = await ProfileModel.findOne({ user: userId });

        if (profile.bookmarks.includes(postId)) {
            await ProfileModel.findOneAndUpdate(
                { user: userId },
                {
                    $pull: {
                        bookmarks: postId,
                    },
                },
            );
            bookmarked = false;
        } else {
            await ProfileModel.findOneAndUpdate(
                { user: userId },
                {
                    $push: {
                        bookmarks: postId,
                    },
                },
            );
            bookmarked = true;
        }
        res.status(200).json({bookmarked})

    } catch (e) {
        console.log(e);
        res.status(500).json({
            massage: "Internel Server Error",
        });
        next(e);
    }
};
