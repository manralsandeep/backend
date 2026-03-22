const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email:{
        type: String,
        unique:[true,"with this email user already registered"]
    },
    password:String
})

//Db to batana pdta hai data kish format mai save hoga DB mai


const userModel = mongoose.model("users", userSchema)
module.exports=userModel
