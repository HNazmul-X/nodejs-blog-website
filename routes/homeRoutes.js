const { homeGetController } = require("../controllers/homeController");
const homeRouter = require("express").Router();

homeRouter.get("/u/:userId", (req, res, next) => {
    console.log(req.params.userId);
    res.json({ massage: req.params.userId });
});
homeRouter.get("/", homeGetController);

module.exports = homeRouter;
