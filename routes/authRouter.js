const { signUpGetController, signUpPostController, loginGetController, loginPostController, logOutController } = require("../controllers/authController");
const { isUnAuthenticate } = require("../middleware/authMiddleware");
const loginValidator = require("../validator/auth/loginValidator");
const SignupValidator = require("../validator/auth/signupValidator");
const authRouter = require("express").Router();

//sign up controller
authRouter.get("/signup", isUnAuthenticate, signUpGetController);
authRouter.post("/signup", [isUnAuthenticate, SignupValidator], signUpPostController);

//login controller
authRouter.get("/login", isUnAuthenticate, loginGetController);
authRouter.post("/login", [isUnAuthenticate, loginValidator], loginPostController);

//logOut controller
authRouter.get("/logout", logOutController);

module.exports = { authRouter };
