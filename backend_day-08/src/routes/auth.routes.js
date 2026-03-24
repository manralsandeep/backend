const express = require("express") //because jaha jaha hum express use krtai hai wha require krna pdta hai
const authController=require("../controllers/auth.controller")
const authRouter = express.Router() // ek container create kiya hai jha routes bangeai authentication kai



//register endpoint

authRouter.post("/register",authController.registerController)


authRouter.post("/login", authController.loginController )

module.exports=authRouter