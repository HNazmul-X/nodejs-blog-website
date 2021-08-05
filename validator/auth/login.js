const { body} = require("express-validator")

const loginValidator = [
    body("email").normalizeEmail().isEmail().withMessage("Invalid Credentatials")
]


module.exports = loginValidator;