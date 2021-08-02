const { signUpGetController, signUpPostController, loginGetController, loginPostController, logOutController } = require("../controllers/authController");
const authRouter = require("express").Router();

//sign up controller
authRouter.get("/signUp", signUpGetController);
authRouter.post("/signUp", signUpPostController);

//login controller
authRouter.get("/login", loginGetController);
authRouter.post("/login", loginPostController);

//logOut controller
authRouter.get("/logout", logOutController);
