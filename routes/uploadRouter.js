const { uploadProfilePics, removeProfilePic } = require("../controllers/uploadController");
const { isAuthenticate } = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMIddleware");
const uploadRouter = require("express").Router();

uploadRouter.post("/profilePic", [isAuthenticate, uploadMiddleware.single("profilePic")], uploadProfilePics);

uploadRouter.delete("/profilePic", isAuthenticate,  removeProfilePic);

module.exports = uploadRouter