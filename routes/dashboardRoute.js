const {
    dashboardGetController,
    createProfileGetController,
    createProfilePostController,
    editProfileGetController,
    editProfilePostController,
    allBookmarksGetController,
    allCommentGetController,
    changePasswordGetController,
    changePasswordPostController,
} = require("../controllers/dashboardController");

const { isAuthenticate } = require("../middleware/authMiddleware");
const changePasswordValidator = require("../validator/dashboard/changePasswordValidator");
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

//Change Password From Dashboard 
dashboardRoutes.get("/change-password", [isAuthenticate], changePasswordGetController)
dashboardRoutes.post("/change-password", [isAuthenticate, changePasswordValidator], changePasswordPostController)


// root route for dashboard
dashboardRoutes.get("/", isAuthenticate, dashboardGetController);
module.exports = dashboardRoutes;
