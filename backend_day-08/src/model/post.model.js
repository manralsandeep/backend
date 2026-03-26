const mongoose = require("mongoose")
 
const postSchema = new mongoose.Schema({
   
    caption: {
        type: String,
        default:""
    },

    imgUrl: {
        type: "String",
        required:[true,"imgUrl is requied for creating a post"]
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,//BATTA HAI NORMAL STRINGNHI AAYEGI YHA EK USE ID AAYEGI 
        ref: "users",//ID USERS COLLECTION SE AAYEGA
        required:[true,"user id is required for creating a post"]
    }


})

const postModel= mongoose.model("posts",postSchema)

module.exports=postModel