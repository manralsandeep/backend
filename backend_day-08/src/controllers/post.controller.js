const postModel = require("../model/post.model")
const ImageKit = require("@imagekit/nodejs")
const likeModel=require("../model/like.model")
const { toFile } = require("@imagekit/nodejs")


const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req,res) {


    
 const file=await imagekit.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), 'file'),
     fileName: 'test',
     folder:"cohort-2-insta-clone-posts"
  
 }) //file upload inmakit.io par
   console.log(file)
    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user:req.user.id
    }) 
    
    res.status(201).json({
        message: "post created sucessfully",
        post
    })
    
}


async function getPostController(req,res) {

  
    
    const userId = req.user.id
    
    const posts = await postModel.find({
        user:userId
    })
   
    res.status(200).json({
        message: "posts fetched sucessfylly",
        posts
    })
}


async function getPostDetailsController(req,res) {
    
   
    const postId = req.params.postId
    const post = await postModel.findById(postId)

    const isValidUser=post.user.toString()===req.user.id
    console.log(isValidUser)
      

    res.status(200).json({
        message: "post fetched sucessfully",
        post
    })

}
 
async function likePostController(req, res) {
    const username=req.user.username
    const postId=req.params.postId
console.log(postId)
    const post = await postModel.findById(postId)
    console.log(post)
    if (!post) {
        return res.status(403).json({
            messgae:"post not found" 
        })
    }

    const like = await likeModel.create({
        post: postId,
        user:username
    })

    res.status(200).json({
        message: "post liked sucessfully",
        like
    })


}
module.exports = {
    createPostController,
    getPostController,
    getPostDetailsController,
    likePostController
}