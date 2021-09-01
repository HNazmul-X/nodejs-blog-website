// user, post , body, replies:{user, body, createdAT}
const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post",
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
                ref: "User",
                required: true,
            },
            body: {
                type: String,
                trim: true,
                required: true,
            },
            createdAT: {
                type: Date,
                default: new Date(),
            },
        },
    ],
}, {timestamps:true});


const CommentModel = model("Comment", commentSchema)
module.exports = CommentModel