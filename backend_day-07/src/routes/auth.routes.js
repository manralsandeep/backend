const express = require("express")      //kyuki jaruri hai authrouter box bnnaai ke liye


const authRouter = express.Router()     //ek dibbaa bn gya jiskai andr hum ab route store kr sktai hai
                                       //app.js ke alwa agr khi file mai route bnarai ho to yeh jruui hai

const jwt = require("jsonwebtoken")
const crypto=require("crypto")

const userModel=require("../models/user.model")

authRouter.post("/register", async (req, res) => {
    
    const { name, email, password } = req.body
    
    const isUserAlreadyExists=await userModel.findOne({email})
   
    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists with this email address"
        })
    }
    
    const hash=crypto.createHash("md5").update(password).digest("hex")
    const user = await userModel.create({
        name,email,password:hash
    })

    const token = jwt.sign(
        {
            id:user._id
        }
        ,

        process.env.JWT_SECRET

    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message: "user registered",
        user,
        token
    })
    
})

authRouter.get("/get-me", async (req, res) => {
    const token = req.cookies.jwt_token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await userModel.findById(decoded.id)
    res.json({
        name: user.name,
        email:user.email
    })
})

authRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    
    const user = await  userModel.findOne({ email })
    if (!user) {
        return res.status(404).json({
        message:"user not found with this email address"
    }) 
    }

    const isPasswordMatched = (user.password ===crypto.createHash("md5").update(password).digest("hex") )
    if (!isPasswordMatched) {
        return res.status(401).json({
              message:"Invalid password"
          })
    }
    const token = jwt.sign({
         id:user._id
    },
        process.env.JWT_SECRET
    )
    res.cookie("jwt_token", token)
    res.status(200).json({
        message: "user logged in",
        user,
    })

})

module.exports=authRouter




                                            //authRouter.post kiya kuki authRouter box ke andr bnarai hai routes
                                            //bakaya ka to yeh route create kiya hai normal enpoitn create kiya hai 