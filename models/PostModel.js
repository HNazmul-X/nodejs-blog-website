// title , body, author, tags, thumnail, likes, dislikes, readtime, comments
const { Schema, model } = require("mongoose");
const CommentModel = require("./CommentModel");
const UserModel = require("./UserModel");

const postSchema = new Schema({
    title: {
        type: String,
        trim: true,
        maxlenght: 100,
        required: true,
    },
    body:{
        type:String,
        trim:true,
        required:true,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:UserModel,
        required:true
    },
    tags:{
        type:[String],
        required:true
    },
    thumnail:String,
    readtimes:String,
    likes:[Schema.Types.ObjectId],
    dislikes:[Schema.Types.ObjectId],
    Comments:[
        {
            type:Schema.Types.ObjectId,
            ref:CommentModel
        }
    ]
},{
    timestamps:true
});

const PostModel = model("Post", postSchema)
module.exports= PostModel
