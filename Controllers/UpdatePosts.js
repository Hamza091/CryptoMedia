const postSchema = require('../Models/Posts')

async function UpdatePosts({firstName,lastName,id,coin,quantity,FollowersId},action)
{
  const newPost = new postSchema({
      userId:id,
      firstName,
      lastName,
      action,
      coin,
      FollowersId,
      quantity
  })
  const response = await newPost.save()
  console.log(response)

}

module.exports=UpdatePosts