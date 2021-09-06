const UserModel = require("../models/UserModel")
const Flash = require("../Utils/Flash")

exports.userGetController  = async (req, res, next) => {

    const {userId} = req.params

    try{
        const user  = await UserModel.findById(userId).populate({
            path:"profile",
            populate:{
                path:"posts",
                select:"title thumbnail"
            }
        })

        // res.json(user)
        res.render("pages/user/user", {
            flashMsg: Flash.getMassage(req),
            user
        })

    } catch(e){
        next(e)
    }





}