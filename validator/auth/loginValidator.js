const { body } = require("express-validator");

const loginValidator = [
    body("email").normalizeEmail().isEmail().withMessage("Email Must be a valid email adress"),
    body("password").not().isEmpty().withMessage("Please give you passworde")
    ];

module.exports = loginValidator;
