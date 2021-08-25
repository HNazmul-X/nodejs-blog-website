const { body } = require("express-validator");
const validator = require("validator");

const urlValidator = (value) => {
    if (value) {
        if (!validator.isURL(value)) {
            throw new Error("Please provide a valid URL");
        }
    }
    return true;
};

module.exports = [
    body("name").not().isEmpty().withMessage("Name cannot be Empty").isLength({ max: 70 }).withMessage("Name cannot be more than 70 character"),
    body("title").not().isEmpty().withMessage("title cannot be Empty").isLength({ max: 100 }).withMessage("title cannot be more than 100 characters"),
    body("bio").not().isEmpty().withMessage("bio data cannot be empty").isLength().withMessage("Bio data cannot be more than 500 charaters"),
    body("facebook").custom(urlValidator),
    body("website").custom(urlValidator),
    body("linkedin").custom(urlValidator),
    body("github").custom(urlValidator),
];
