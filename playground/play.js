const {  validationResult } = require("express-validator");
const upload = require("../middleware/uploadMIddleware");

const playgroundRouter = require("express").Router();

playgroundRouter.get("/play", (req, res, next) => {
    res.render("pages/playground/signup", { flashMsg:{}});
});

playgroundRouter.post("/play", upload.single("profile-image"), (req, res, next) => {
    if (req.file) {
        console.log(req.file);
    }
    res.redirect("/playground/play");
});

module.exports = playgroundRouter;

