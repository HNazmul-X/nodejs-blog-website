const { body } = require("express-validator");
const UserModel = require("../../models/UserModel");

const SignupValidator = [
    body("username")
        .isLength({ min: 3, max: 30 })
        .withMessage("username Must be between 3 to 30 charecter")
        .trim()
        .custom(async (username) => {
            const isUserExist = await UserModel.findOne({ username });
            if (isUserExist) {
                return Promise.reject("User name is Already used. Please try another");
            } else {
                return true;
            }
        }),
    body("email")
        .isEmail()
        .withMessage("Email must be a Valid email adress")
        .normalizeEmail()
        .custom(async (email) => {
            const isEmailExist = await UserModel.findOne({ email });
            if (isEmailExist) {
                return Promise.reject("Email is already used. please try another");
            }
        }),
    body("password")
        .matches(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage("Password Must be 8 character and Atlest one number"),
    body("confirmPassword").custom((confirmPassword , {req})=> {
        if(confirmPassword !== req?.body?.password){
            throw new Error("Password Doesn't match")
        }else {
            return true
        }
    })
];


module.exports = SignupValidator;