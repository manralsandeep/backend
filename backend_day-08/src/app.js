const express = require("express")
const authRouter = require("../src/routes/auth.routes")
const cookieParser=require("cookie-parser")
const postRouter=require("./routes/post.routes")

const app = express()   //server instance created

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter) //middleware hai ek jo bhi endpoint  req /api/auth krke aayegi yeh dibbbai ke andnr jayegi
app.use("/api/posts",postRouter) //middleware hai koi bhi enpoint /api/posts se hit hoga to esh box mia dal dena ush req ko 




module.exports=app 


