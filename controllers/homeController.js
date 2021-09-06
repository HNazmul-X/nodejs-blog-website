const PostModel = require("../models/PostModel");
const ProfileModel = require("../models/ProfileModel");
const Flash = require("../Utils/Flash");
const moment = require("moment")


const generateDate = (days) => {
    let date = moment().subtract(days,"days")
    return date.toDate()
}

const generateFilterObject = (filterString) => {

    let filterObj = {}
    let order = 1

    switch(filterString){
        case "week" :{
            filterObj = {
                createdAt:{
                    $gt:generateDate(7)
                }
            };
            order = -1;
            break
        }
        case "month" : {
            filterObj = {
                createdAt:{
                    $gt:generateDate(30)
                }
            }
            order = -1;
            break
        } 
        case "all" : {
            order = -1
            break
        }
        case "latest":{
            filterObj = {}
            order = -1;
        }

    }


    return {
        filterObj,
        order
    }

}

exports.homeGetController = async (req, res, next) => {

    const filter = req.query.filter || "latest"
    const {filterObj, order} = generateFilterObject(filter)
    const currentPage = parseInt(req.query.page) || 1;
    const itemPerpage = 10

    

    try {
        let profile = []

        if(req.user){
            profile = await ProfileModel.findOne({user : req.user._id})
        }

        const posts = await PostModel.find(filterObj)
            .populate({path:"author", select:"username profilePic"})
            .sort({createdAt:order})
            .skip((currentPage * itemPerpage) - itemPerpage)
            .limit(itemPerpage)

        const totalpost = await PostModel.countDocuments()
        const totalPage = totalpost / itemPerpage

        res.render("pages/home/home", {
            flashMsg: Flash.getMassage(req),
            filter: filter.charAt(0).toUpperCase() + filter.substr(1, filter.length).toLowerCase(),
            profile : profile || {},
            posts,
            totalPage,
            currentPage,
            itemPerpage
        });
    } catch (e) {}
};
