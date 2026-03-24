const express = require("express")
const authRouter = require("../src/routes/auth.routes")
const cookieParser=require("cookie-parser")


const app = express()   //server instance created

app.use(express.json())
app.use("/api/auth",authRouter) //middleware hai ek jo bhi endpoint  req /api/auth krke aayegi yeh dibbbai ke andnr jayegi
app.use(cookieParser())



module.exports=app 


