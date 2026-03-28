
const userModel = require("../model/user.model")
const jwt=require("jsonwebtoken")
const bcrypt = require("bcryptjs")


//register endpoint
async function registerController(req, res) {
   
    const { username, password, email, bio, profileImage } = req.body
    
    const isUserAlreadyExists = await userModel.findOne({
        $or :[
            { email },
            {username}
          ] 
    })

    if (isUserAlreadyExists) {
        let msg = "user already exists with this " 
         
        if (isUserAlreadyExists.email === email) {
           msg+="Email" 
        }

        if (isUserAlreadyExists.username === username) {
            msg+=" Username"
        }
        
        return res.status(409).json({
            message:msg
        })

    }
    
    const hash= await bcrypt.hash(password,10)
    
    const user = await userModel.create({
        username,email,password:hash
    }) 

    const token = jwt.sign(
        {
            id: user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("jwt_token",token)

    res.status(201).json({
        message: "user registered",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage:user.profileImage
     
        }
    })
 


}


//login endpoint

async function loginController (req, res) {
    
    const { email, password, username } = req.body 

    const user = await userModel.findOne({
        
        $or: [
            { email },
            { username }
        ]
    }
    )
  
     
    if (!user) {
        return res.status(401).json({
            message:"user not found"
        })
    }
  
   
    const isPasswordMatched= await bcrypt.compare(password,user.password)
    if (!isPasswordMatched) {
        return res.status(404).json({
            message:"password invalid"
        })
    }
  
    const token = jwt.sign({
        id: user._id,
        username:user.username
    },
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
    
    res.cookie("jwt_token", token)
    
    res.status(201).json({
        message: "user loggedin",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage:user.profileImage
        }

    })

    
    
}


module.exports = {
    registerController,
    loginController
}