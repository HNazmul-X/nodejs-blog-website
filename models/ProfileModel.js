// title, bio, links, post, profilepic, user,bookmarks
const { Schema, model } = require("mongoose");
const PostModel = require("./PostModel");
const UserModel = require("./UserModel");
const profileSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: UserModel,
            required: true,
        },
        title: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        bio: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        links: {
            fb: String,
            twitter: String,
            website: String,
            github: String,
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: PostModel,
            },
        ],
        bookmarks: [
            {
                type: Schema.Types.ObjectId,
                ref: PostModel,
            },
        ],
    },
    {
        timestamps: true,
    },
);

const ProfileModel = model("Profile", profileSchema)

module.exports = ProfileModel