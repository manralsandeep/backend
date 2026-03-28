const jwt = require("jsonwebtoken")

function verifyUser(req, res, next) {
    
     // console.log(req.body, req.file) 
        const token = req.cookies.jwt_token
        if (!token) {
            return res.status(401).json({
                message:"Token not provided ,Unathorized access"
            })
        }
    
        let decoded = null;
        try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
        }
        catch(err) {
            return res.status(401).json({
                message:"Unauthorized access"
            })
    }

    req.user=decoded
    
    next()
        
}


module.exports=verifyUser