const UserModel = require("../models/UserModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Flash = require("../Utils/Flash");

exports.signUpGetController = (req, res, next) => {
    res.render("pages/auth/signup", { error: {}, value: {}, flashMsg: Flash.getMassage(req) });
};

exports.signUpPostController = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    const isDataVerified = validationResult(req).formatWith((e) => e?.msg);
    let restoredUserData = { username, password, email, confirmPassword };

    if (isDataVerified.isEmpty()) {
        try {
            const hasedPassword = await bcrypt.hash(password, 12);
            const createdUser = await new UserModel({
                username,
                email: email?.toLowerCase(),
                password: hasedPassword,
            }).save();
            if (createdUser) {
                req.session.isLoggedIn = true;
                req.session.user = createdUser;
                req.session.save((issue) => {
                    if (issue) {
                        return next(issue);
                    } else {
                        res.redirect("/dashboard/");
                    }
                });
            }
        } catch (error) {
            next(error);
        }
    } else {
        req.flash("fail", "please check the form");
        res.render("pages/auth/signup", {
            error: isDataVerified.mapped(),
            value: restoredUserData,
            flashMsg: Flash.getMassage(req),
        });
    }
};

//====================================================
// login contorllers
//====================================================
exports.loginGetController = (req, res, next) => {
    res.render("pages/auth/login", {
        errorStr: "",
        errorObj: {},
        flashMsg: Flash.getMassage(req),
    });
};

exports.loginPostController = async (req, res, next) => {
    const isDataRight = validationResult(req);

    if (isDataRight.isEmpty()) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email: email?.toLowerCase() });
            if (!user) {
                req.flash("fail", "Please provide a valid UserName or Password");
                res.render("pages/auth/login", { errorStr: "Invalid Email or Password", errorObj: {}, flashMsg: Flash.getMassage(req) });
            } else {
                const isPasswordMatch = await bcrypt.compare(password, user?.password);

                if (!isPasswordMatch) {
                    req.flash("fail", "Please provide a valid UserName or Password");
                    res.render("pages/auth/login", { errorStr: "Invalid Email or Password", errorObj: {}, flashMsg: Flash.getMassage(req) });
                } else {
                    // successfull login
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    req.session.save((issue) => {
                        if (issue) {
                            return next(issue);
                        } else {
                            req.flash("success", "You are successfully Logged In");
                            res.redirect("/dashboard/");
                        }
                    });
                }
            }
        } catch (err) {
            next(err);
        }
    } else {
        const dataEmptyError = isDataRight.formatWith((e) => e.msg).mapped();
        req.flash("fail", "Please Check the form");
        res.render("pages/auth/login", { errorStr: "", errorObj: { email: dataEmptyError.email, password: dataEmptyError.password }, flashMsg: Flash.getMassage(req) });
    }
};

exports.logOutController = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            return next(err);
        } else {
            res.redirect("/auth/login");
        }
    });
};
