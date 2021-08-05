//user need " email, username, password   "
const {Schema,  model} = require("mongoose")

const userSchema = new Schema({

    username:{
        type:String,
        require:true,
        trim:true,
        maxLength:30,
        minLength:3
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    profile:{
        type:Schema.Types.ObjectId,
        ref:"Profile"
    }
}, {
    timestamps:true
})

const UserModel = model("User", userSchema)
module.exports = UserModel