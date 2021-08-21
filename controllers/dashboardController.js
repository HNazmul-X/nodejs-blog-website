const chalk = require("chalk");
const ProfileModel = require("../models/ProfileModel");
const Flash = require("../Utils/Flash");

exports.dashboardGetController = async (req, res, next) => {
    try {
        const profile = await ProfileModel.findOne({ user: req.user._id });
        console.log(chalk.white.inverse(req.user));

        if (profile) {
            res.render("pages/dashboard/dashboard", {
                flashMsg: Flash.getMassage(req),
            });
        } else {
            res.redirect("/dashboard/create-profile");
        }
    } catch (e) {
        next(e);
    }
};

exports.createProfileGetController = async (req, res, next) => {
    try {
        const profile = await ProfileModel.findOne({ user: req.user._id });

        if (profile) {
            return res.redirect("/dashboard/edit-profile");
        } else {
            res.render("pages/dashboard/create-profile", { flashMsg: Flash.getMassage(req) });
        }
    } catch (e) {}
};

exports.createProfilePostController = (req, res, next) => {
    next();
};

exports.editProfileGetController = (req, res, next) => {
    next();
};

exports.editProfilePostController = (req, res, next) => {
    next();
};
