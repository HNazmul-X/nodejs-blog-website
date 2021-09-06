const { validationResult } = require("express-validator");
const PostModel = require("../models/PostModel");
const ProfileModel = require("../models/ProfileModel");
const Flash = require("../Utils/Flash");
const readingTime = require("reading-time");

exports.getAllPost = async (req, res, next) => {
    try {
        const profile = await ProfileModel.findOne({ user: req.user._id });
        if (!profile) {
            return res.redirect("/dashboard/create-profile");
        } else {
            const posts = await PostModel.find({author:req.user._id});
            
                res.render("pages/dashboard/Post/get-all-post", {
                    flashMsg: Flash.getMassage(req),
                    profile,
                    error: {},
                    posts,
                });
        }
    } catch (e) {
        next(e);
    }
};

exports.postGetController = async (req, res, next) => {
    try {
        const profile = await ProfileModel.findOne({ user: req.user._id });
        if (profile) {
            res.render("pages/dashboard/Post/create-post", {
                flashMsg: Flash.getMassage(req),
                profile: profile,
                error: {},
                value: {},
            });
        } else {
            res.redirect("/dashboard/create-profile");
        }
    } catch (e) {
        next(e);
    }
};

exports.postPostController = async (req, res, next) => {
    const error = validationResult(req).formatWith((e) => e.msg);

    let { title, body, tags } = req.body;
    try {
        const profile = await ProfileModel.findOne({ user: req.user._id });

        if (!error.isEmpty()) {
            return res.render("pages/dashboard/Post/create-post", {
                error: error.mapped(),
                flashMsg: Flash.getMassage(req),
                profile: profile,
                value: { title, body, tags },
            });
        } else {
            let thumbnail = "/images/blog-placeholder.png";

            if (tags) {
                tags = tags.split(",");
            }
            if (req.file) {
                thumbnail = `/upload/${req.file.filename}` || "";
            }
            const readtimes = readingTime(body).text;

            try {
                const createdPost = await new PostModel({
                    title,
                    body,
                    tags,
                    author: req.user._id,
                    thumbnail,
                    readtimes,
                    likes: [],
                    dislikes: [],
                    comments: [],
                }).save();

                const updatedProfileWithPushingNewPost = await ProfileModel.findOneAndUpdate(
                    { user: req.user._id },
                    {
                        $push: {
                            posts: createdPost._id,
                        },
                    },
                    { new: true },
                );

                if (updatedProfileWithPushingNewPost) {
                    req.flash("success", `"${createdPost.title}" this post is created Successfully`);
                    res.redirect("/post/edit/" + createdPost._id);
                }
            } catch (e) {
                next(e);
            }
        }
    } catch (e) {
        next(e);
    }
};

exports.editPostGetController = async (req, res, next) => {
    const { postId } = req.params;
    const post = await PostModel.findOne({ author: req.user._id, _id: postId });
    const profile = await ProfileModel.findOne({ user: req.user._id });
    if (!post) {
        const error = new Error("Post not Found");
        throw error;
    } else {
        res.render("pages/dashboard/Post/edit-post", {
            flashMsg: Flash.getMassage(req),
            post,
            error: {},
            profile,
        });
    }
};
exports.editPostPostController = async (req, res, next) => {
    const { postId } = req.params;
    const error = validationResult(req).formatWith((e) => e.msg);
    const post = await PostModel.findOne({ author: req.user._id, _id: postId });
    const profile = await ProfileModel.findOne({ user: req.user._id });
    const { title, body } = req.body;
    const thumbnail = req.file ? `/upload/${req.file.filename}` : post.thumbnail;
    const tags = req.body.tags ? req.body.tags.split(",") : post.tags;

    try {
        if (!post) {
            throw new Error("Post Not Found");
        } else {
            if (!error.isEmpty()) {
                req.flash("fail", "please check the form");
                return res.render("pages/dashboard/Post/edit-post", {
                    error: error.mapped(),
                    flashMsg: Flash.getMassage(req),
                    profile: profile,
                    post,
                });
            } else {
                try {
                    const updatedPost = await PostModel.findOneAndUpdate({ _id: postId }, { $set: { title, thumbnail, body, tags } }, { new: true });
                    if (updatedPost) {
                        req.flash("success");
                        res.redirect(`/post/edit/${post._id}`);
                    } else {
                        req.flash("fail", "Post Updated Failed , Please try again later");
                        res.redirect(`/post/edit/${post._id}`);
                    }
                } catch (e) {
                    next(e);
                }
            }
        }
    } catch (e) {
        next(e);
    }
};

exports.deletePostGetController = async (req, res, next) => {
    const { postId } = req.params;
    try {
        const profile = await ProfileModel.findOne({ user: req.user._id });

        if (profile) {

            await PostModel.findOneAndDelete({ _id: postId, author: req.user._id });
            await ProfileModel.findOneAndUpdate(
                { user: req.user._id },
                {
                    $pull: {
                        posts: postId,
                    },
                },
            );
            req.flash("success", "post delted successfully");
            res.redirect("/post");
        }
    } catch (e) {
        next(e);
    }
};


exports.singlePostView = async (req, res, next) => {

    const {postId} = req.params

    const post = await PostModel.findOne({_id:postId}).populate("author", "username profilePic")
    .populate({
        path:"comments", 
        populate:{
            path:"user",
            select:"username profilePic"
        }
    })
    .populate({
        path:"comments",
        populate:{
            path:"replies.user",
            select:"username profilePic"
        }
    })
    
    let profile = null

    if(req.user){
       profile = await ProfileModel.findOne({user:req.user._id})
    }

    res.render("pages/dashboard/Post/single-post-view", {
        flashMsg:Flash,
        profile,
        post
    })

}