const {
    dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    editProfileGetController,
    editProfilePostController,
    allBookmarksGetController,
    allCommentGetController,
} = require("../controllers/dashboardController");

const { isAuthenticate } = require("../middleware/authMiddleware");
const profileValidator = require("../validator/dashboard/profileValidator");

const dashboardRoutes = require("express").Router();

//create profile
dashboardRoutes.get("/create-profile", isAuthenticate, createProfileGetController);
dashboardRoutes.post("/create-profile", isAuthenticate, profileValidator, createProfilePostController);

//create profile
dashboardRoutes.get("/edit-profile", isAuthenticate, editProfileGetController);
dashboardRoutes.post("/edit-profile", isAuthenticate, profileValidator, editProfilePostController);

//bookmark All getting
dashboardRoutes.get("/bookmarks", isAuthenticate, allBookmarksGetController);

//all comment from Dashborad route
dashboardRoutes.get("/comments", isAuthenticate, allCommentGetController)

// root route for dashboard
dashboardRoutes.get("/", isAuthenticate, dashboardGetController);
module.exports = dashboardRoutes;
