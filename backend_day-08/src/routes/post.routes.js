const express = require("express")
const postController = require("../controllers/post.controller")
const verifyUser=require("../middlewares/auth.middleware")
const postRouter = express.Router()
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() }) //file ko khi to save krna pdega ya to server kai (server pai) disk mai ya to                                                  // khi cloud storage provider mai yeh line file ko temporary memory mai save krti hai server mai 
                                                       //  fir cloud storage pai save kr sktai hai aur yha se delete kr deta hai serever
                                                          
                                                          



                                                       
                                                          
postRouter.post("/",upload.single("image"),verifyUser,postController.createPostController)

//upload.single(file name) yeh middleware hai essai hum padh parai hai hum file ko


postRouter.get("/",verifyUser,postController.getPostController)

postRouter.get("/details/:postId", verifyUser, postController.getPostDetailsController)

postRouter.post("/like/:postId",verifyUser,postController.likePostController)

module.exports=postRouter