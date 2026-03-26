const postModel = require("../model/post.model")
const ImageKit=require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt=require("jsonwebtoken")

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req,res) {

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
    
    
 const file=await imagekit.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), 'file'),
     fileName: 'test',
     folder:"cohort-2-insta-clone-posts"
  
 }) //file upload inmakit.io par
   console.log(file)
    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user:decoded.id
    }) 
    
    res.status(201).json({
        message: "post created sucessfully",
        post
    })
    
}



module.exports = {
    createPostController
}