const express = require("express");
const userRouter = express.Router();
const userHandler = require("../controller/userController");
const middleware = require("../utility/middleware/auth");

userRouter.post("/signup", userHandler.signUpHandler);
userRouter.post("/login", userHandler.loginHandler);
userRouter.get("/getUsers",middleware, userHandler.getUsersHandler);
userRouter.get("/getUserById/:id",middleware, userHandler.getUserByIdHandler);

module.exports = userRouter; 