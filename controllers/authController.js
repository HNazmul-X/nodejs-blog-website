const UserModel = require("../models/UserModel");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { response } = require("express");

exports.signUpGetController = (req, res, next) => {
    res.render("pages/auth/signup", { error: {}, value: {} });
};

exports.signUpPostController = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    const isDataVerified = validationResult(req).formatWith((e) => e?.msg);
    let restoredUserData = { username, password, email, confirmPassword };

    console.log(isDataVerified);

    if (isDataVerified.isEmpty()) {
        console.log("hello I am entering");
        try {
            const hasedPassword = await bcrypt.hash(password, 12);
            const createdUser = await new UserModel({
                username,
                email: email?.toLowerCase(),
                password: hasedPassword,
            }).save();
            res.send(createdUser);

            console.log(createdUser);
            restoredUserData = {};
        } catch (error) {
            console.log(error);
            next();
        }
    } else {
        console.log({ username, email, password, confirmPassword });
        res.render("pages/auth/signup", { error: isDataVerified.mapped(), value: restoredUserData });
    }
};

//====================================================
// login contorllers
//====================================================
exports.loginGetController = (req, res, next) => {
    res.render("pages/auth/login", { errorStr: "", errorObj: {} });
};

exports.loginPostController = async (req, res, next) => {
    const isDataRight = validationResult(req);

    if (isDataRight.isEmpty()) {
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email: email?.toLowerCase() });
            if (!user) {
                res.render("pages/auth/login", { errorStr: "Invalid Email or Password", errorObj: {} });
            } else {
                const isPasswordMatch = await bcrypt.compare(password, user?.password);

                if (!isPasswordMatch) {
                    res.render("pages/auth/login", { errorStr: "Invalid Email or Password", errorObj: {} });
                } else {
                    // successfull login
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    req.session.save((issue) => {
                        if (issue) {
                            console.log(issue);
                            return next(issue);
                        } else {
                            res.redirect("/dashboard/");
                        }
                    });
                }
            }
        } catch (err) {
            console.log(err);
            next();
        }
    } else {
        const dataEmptyError = isDataRight.formatWith((e) => e.msg).mapped();
        res.render("pages/auth/login", { errorStr: "", errorObj: { email: dataEmptyError.email, password: dataEmptyError.password } });
    }
};

exports.logOutController = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return next();
        } else {
            res.redirect("/auth/login");
        }
    });
};
