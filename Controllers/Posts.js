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
   //  const id = to_String(details.data._id)
//     console.log(details.data._id.toString())
         // const posts = await postsSchema.find()
         // var filterPosts = []
         // for(var i=0; i<posts.length; i++)
         // {
         //    for(var j=0; j<posts[i].FollowersId.length; j++)
         //    {
         //       if(posts[i].FollowersId[j].id===details.data._id)
         //       {
         //          filterPosts.push(posts[i])
         //          break
         //       }
         //    }
         // }