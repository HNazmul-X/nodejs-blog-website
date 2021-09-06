const PostModel = require("../models/PostModel");
const ProfileModel = require("../models/ProfileModel");
const Flash = require("../Utils/Flash");

exports.searchGetController = async (req, res, next) => {
    try {
        const searchStr = req.query.search;
        const currentPage = parseInt(req.query.page) || 1;
        const itemPerPage = 10;

        const posts = await PostModel.find({
            $text: { $search: searchStr },
        })
            .skip(currentPage * itemPerPage - itemPerPage)
            .limit(itemPerPage);

        const totalPost = await PostModel.countDocuments({
            $text: { $search: searchStr },
        });

        const totalPage = totalPost / itemPerPage;
        const profile = await ProfileModel.findOne({ user: req.user._id });

        res.render("pages/search/search", {
            flashMsg: Flash.getMassage(req),
            posts,
            totalPage,
            currentPage,
            searchStr,
            profile: profile || {},
        });
    } catch (e) {
        next(e);
    }
};
