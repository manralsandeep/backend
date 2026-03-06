const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");


const app = require("./src/app")
require("dotenv").config()
const connectToDb = require("./src/config/database")



connectToDb()

app.listen(3000, () => {
    console.log("server satrted at port 3000")
})