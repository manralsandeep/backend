const express = require("express") 
const app = express() //server ka instance create hogya hai
const authRouter = require("./routes/auth.routes")
const cookieParser=require("cookie-parser")
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)      //jab bhi /api/auth se endpoint hit hoga woh enpoint req esh box ke andr bhej di ajygeai yeh solve krega usko
module.exports=app  //servre ka instance jo crete huaa uska adress deidya  