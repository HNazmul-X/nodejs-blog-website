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
            const regex = /\s+/g;
            const totalWord = node.text().match(regex).length

            if (totalWord> 1000) {
                throw new Error("Body can Not be greater than 1000 words");
            }
            return true;
        }),
    body("tags").not().isEmpty().withMessage("Tags cannot be empty")
];
