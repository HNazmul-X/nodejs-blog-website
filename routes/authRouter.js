const { signUpGetController, signUpPostController, loginGetController, loginPostController, logOutController } = require("../controllers/authController");
const loginValidator = require("../validator/auth/loginValidator");
const SignupValidator = require("../validator/auth/signupValidator");
const authRouter = require("express").Router();

//sign up controller
authRouter.get("/signup", signUpGetController);
authRouter.post("/signup",SignupValidator,signUpPostController);

//login controller
authRouter.get("/login", loginGetController);
authRouter.post("/login",loginValidator, loginPostController);

//logOut controller
authRouter.get("/logout", logOutController);


module.exports = {authRouter}