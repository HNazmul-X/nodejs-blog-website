const { validationResult } = require("express-validator");
const PostModel = require("../models/PostModel");
const ProfileModel = require("../models/ProfileModel");
const Flash = require("../Utils/Flash");
const readingTime = require("reading-time");

exports.postGetController = async (req, res, next) => {
    try {
        const profile = await ProfileModel.findOne({ user: req.user._id });
        if (profile) {
            res.render("pages/dashboard/post/create-post", {
                flashMsg: Flash.getMassage(req),
                profile: profile,
                error: {},
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

    try {
        const profile = await ProfileModel.findOne({ user: req.user._id });

        if (!error.isEmpty()) {
            return res.render("pages/dashboard/post/create-post", {
                error: error.mapped(),
                flashMsg: Flash.getMassage(req),
                profile: profile,
            });
        } else {
            let { title, body, tags } = req.body;
            let thumbnail;

            if (tags) {
                tags = tags.split(",");
            }
            if (req.file) {
                thumbnail = req.file || "";
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
                }).save()

               const updatedProfileWithPushingNewPost  =  await ProfileModel.findOneAndUpdate(
                    { user: req.user._id },
                    {
                        $push: {
                            posts: createdPost._id
                        },
                    },
                    {new:true}
                );

                if(updatedProfileWithPushingNewPost){
                    req.flash("success", `"${createdPost.title}" this post is created Successfully`)
                    res.redirect("/post/edit/"+createdPost._id)
                }

            } catch (e) {
                next(e);
            }   
        }
    } catch (e) {
        next(e);
    }
};
