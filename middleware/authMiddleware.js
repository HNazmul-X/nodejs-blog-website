const UserModel = require("../models/UserModel");

exports.bindUserWithRequest = () => {
    return async (req, res, next) => {
        if (!req.session.isLoggedIn) {
            return next();
        } else {
            try {
                const User = await UserModel.findById(req.session.user._id);
                req.user = User;
                return next()
            } catch (error) {
                console.log(error);
                next(error);
            }
        }
    };
};

exports.isAuthenticate = (req, res, next) => {

    if(!req.session.isLoggedIn){
        res.redirect("/auth/login")
    }
    else{
        return next()
    }
}
