const mongoose = require("mongoose")

async function connectToDB() {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to DB")
    
}

module.exports=connectToDB //fnc ka adress export kr diya