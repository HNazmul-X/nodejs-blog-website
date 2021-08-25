const { body } = require("express-validator");
const cheerio = require("cheerio");

module.exports = [
    body("title").not().isEmpty().withMessage("Title Cannot be empty").isLength({ max: 100 }).withMessage("Title cannot be greater then 100 chars").trim(),
    body("body")
        .not()
        .isEmpty()
        .withMessage("Post cannot be empty")
        .custom((value) => {
            const node = cheerio.load(value);
            const text = node.text();

            if (text.length > 5000) {
                throw new Error("Body can Not be greater than 500 chars");
            }
            return true;
        }),
    body("tags").not().isEmpty().withMessage("Tags cannot be empty")
];
