const { check, validationResult } = require("express-validator");

const playgroundRouter = require("express").Router();

playgroundRouter.get("/playground", (req, res, next) => {
    res.render("pages/playground/signup", { erro: {} });
});

playgroundRouter.post(
    "/playground/",
    [
        check("email").normalizeEmail().isEmail().withMessage("Please provide a valid Email address").not().isEmpty().withMessage("Please provide your email address"),
        check("password").not().isEmpty().withMessage("please provide your Password"),
    ],
    async (req, res, next) => {
        const isError = validationResult(req);
        console.log();
        res.json({
            isError: isError.formatWith((e) => e.msg).mapped()
        });
    },
);

module.exports = playgroundRouter;
