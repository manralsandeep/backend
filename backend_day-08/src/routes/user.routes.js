const express = require("express")
const userController = require("../controllers/user.controller")
const verifyUser=require("../middlewares/auth.middleware")
const userRouter = express.Router()


userRouter.post("/follow/:username",verifyUser,userController.followUserController)
userRouter.post("/unfollow/:username",verifyUser,userController.unfollowUserController)
module.exports=userRouter