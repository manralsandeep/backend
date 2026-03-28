const userModel=require("../model/user.model")
const followModel = require("../model/follow.model")

async function followUserController(req, res) {
    
    const followerUsername = req.user.username
    const followeeUsername = req.params.username
    
    const isfolloweeExists = await userModel.findOne({
        username:followeeUsername
    })
  

    if (!isfolloweeExists) {
        return res.status(404).json({
            message:"user you are trying to follow  not exist"
        })
    } 

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee:followeeUsername
    })
    
    if (isAlreadyFollowing) {
        return res.status(404).json({
            message:`you are already following  ${followeeUsername}`
        }
        )
    }
  

    if (followerUsername == followeeUsername) {
        
        return res.status(404).json({
            message:"you are trying to follow yourself"
        })
    }

     
    const followRecord = await followModel.create({
        follower: followerUsername,
        followee:followeeUsername
    }) 

  
    res.status(201).json({
        message: `you are now following ${followeeUsername}`,
        followRecord
    })
}


async function unfollowUserController(req,res) {
    
    const followerUsername = req.user.username
    const followeeUsername = req.params.username
    

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee:followeeUsername

    })

    if (!isUserFollowing) {
        return res.status(404).json({
            message:`you are not following ${followeeUsername} `
        })
    }
    

   
    await followModel.findByIdAndDelete(isUserFollowing._id)
    
    res.status(200).json({
        message:`you have unfollowed ${followeeUsername}`
    })
}


module.exports = {
    followUserController,
    unfollowUserController
  
}
