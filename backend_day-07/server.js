require("dotenv").config()


const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");



const app = require("./src/app")

//adress leliya server ka instance ka 

const connectToDB = require("./src/config/database")
//databse file se fnc ka adress agya edhr 



connectToDB() 

//connectToDB variable mai jo adress save hai fnc ka uspai jake fnc ko call kro
app.listen(3000, () => { console.log("server started at port 3000") })
//adress pai jo serve ha usko start kr diya 
