const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

exports.signUpGetController = (req, res, next) => {
    res.render("pages/auth/signup", { title: "crea a contact" });
};

exports.signUpPostController = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        const hasedPassword = await bcrypt.hash(password, 12);
        const createdUser = await new UserModel({
            username,
            email: email?.toLowerCase(),
            password: hasedPassword,
        }).save();
        res.send(createdUser);

        console.log(createdUser);
    } catch (error) {
        console.log(error);
        next();
    }
};

exports.loginGetController = (req, res, next) => {
    res.render("pages/auth/login");
};

exports.loginPostController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({email:email?.toLowerCase()});
        if(!user){
            res.json({error:"invalid creadentials"})
        }
        else{
            const isPasswordMatch = await bcrypt.compare(password, user?.password)
            if(!isPasswordMatch){
                res.json({
                    error:"inavlid password or email"
                })
            }
            else{
                console.log(user);
                console.log(isPasswordMatch);
                res.redirect("/auth/signup");
            }

        }

    } catch (err) {
        console.log(err);
        next()
    }
};

exports.logOutController = (req, res, next) => {};
