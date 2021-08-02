//user need " email, username, password   "
const {Schema,  model} = require("mongoose")
const ProfileModel = require("./ProfileModel")

const userSchema = new Schema({

    name:{
        type:String,
        require:true,
        trim:true,
        maxlength:30,
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:true,
        required:true,
    },
    profile:{
        type:Schema.Types.ObjectId,
        ref:ProfileModel
    }
})

const UserModel = model("User", userSchema)
module.exports = UserModel