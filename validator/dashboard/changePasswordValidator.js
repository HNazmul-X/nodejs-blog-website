const { body } = require("express-validator");

module.exports = [
    body("oldPassword").not().isEmpty().withMessage("Please Enter Your Old Password to change"),
    body("newPassword")
        .not()
        .isEmpty()
        .withMessage("Please Enter Your New Passsword")
        .matches(/^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{8,}$/)
        .withMessage("Password Must be one Capital Latter and 8 character and One Number"),
    body("newConfirmPassword")
        .not()
        .isEmpty()
        .withMessage("Please Retype Your New Password")
        .custom((value, { req }) => {
            if (value !== req.body.newPassword) {
                throw new Error("Password didn't Match With Your New Password");
            } else {
                return true;
            }
        }),
];
