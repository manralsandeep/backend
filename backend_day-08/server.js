require("dotenv").config()

const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

const app = require("./src/app")
const connectToDatabase = require("./src/config/database")



connectToDatabase()


app.listen(3000, (req, res) => {
    console.log("server started at port 3000")
})