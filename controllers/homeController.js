const PostModel = require("../models/PostModel");
const ProfileModel = require("../models/ProfileModel");
const Flash = require("../Utils/Flash");

exports.homeGetController = async (req, res, next) => {

    const filter = req.query.filter || "latest"

    

    try {
        let profile = []

        if(req.user){
            profile = await ProfileModel.findOne({user : req.user._id})
        }

        const posts = await PostModel.find()
        res.render("pages/home/home", {
            flashMsg: Flash.getMassage(req),
            filter: filter.charAt(0).toUpperCase() + filter.substr(1, filter.length).toLowerCase(),
            profile,
            posts,
        });
    } catch (e) {}
};
