
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");


const app = require('./src/app')
const mongoose=require("mongoose")

 async function connectToDb() {
    
  await mongoose.connect("mongodb+srv://sandeepmanral:ikN4Pm15Lm2SRTCR@cluster0.qk4engu.mongodb.net/day-04")
    
  console.log("connected to db")

}
connectToDb()

app.listen(3000, () => { console.log("server started at port 3000") })

//server started // connect to db