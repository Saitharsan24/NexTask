const express = require("express");
const userRouter = express.Router();
const userHandler = require("../controller/userController");


userRouter.post("/signup", userHandler.signUpHandler);
userRouter.post("/login", userHandler.loginHandler);

module.exports = userRouter;