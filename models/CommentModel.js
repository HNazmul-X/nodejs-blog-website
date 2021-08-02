// user, post , body, replies:{user, body, createdAT}
const { Schema, model } = require("mongoose");
const PostModel = require("./PostModel");
const UserModel = require("./UserModel");

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: UserModel,
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: PostModel,
        required: true,
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    replies: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: UserModel,
                required: true,
            },
            body: {
                type: String,
                trim: true,
                required: true,
            },
            createdAT: {
                type: Date,
                default: new Data(),
            },
        },
    ],
});


const CommentModel = model("Comment", commentSchema)
module.exports = CommentModel