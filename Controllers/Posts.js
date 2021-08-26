const postsSchema = require('../Models/Posts')

async function Posts(req,res){
    const details = JSON.parse(req.query.loginCredentials)
    console.log("Get posts..")
         const filterPosts = await postsSchema.aggregate([{"$unwind":"$FollowersId"},{"$match":{"FollowersId.id":details.data._id}}])
         console.log("filteredPosts")
         console.log(filterPosts)
         res.send({filterPosts})
}

module.exports=Posts
