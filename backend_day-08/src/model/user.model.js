const mongoose = require("mongoose")

const userSchema=new mongoose.Schema({
   
    username: {
        type: String,
        unique: [true, "User already  exists  "],
        required:[true, "Username required"]
    },

    email: {
        type: String,
        unique: [true, "Email already exists "],
        required:[true, "Email required"]
    },

    password: {
        type: String,
        required:[true,"Password required"]
    },


    bio: String,

    profileImage: {
        type: String,
        default:"https://ik.imagekit.io/5hroisnb5/profile%20userImage.webp"
        
    }
   
})

const userModel = mongoose.model("users", userSchema)

module.exports=userModel