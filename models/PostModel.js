// title , body, author, tags, thumnail, likes, dislikes, readtime, comments
const { Schema, model } = require("mongoose");

const postSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            maxlenght: 100,
            required: true,
        },
        body: {
            type: String,
            trim: true,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        tags: {
            type: [String],
            required: true,
            trim: true,
        },
        thumbnail: String,
        readtimes: String,
        likes: [Schema.Types.ObjectId],
        dislikes: [Schema.Types.ObjectId],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    {
        timestamps: true,
    },
);

const PostModel = model("Post", postSchema);
module.exports = PostModel;
