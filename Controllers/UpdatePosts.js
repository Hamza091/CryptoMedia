// const userSchema = require('../Models/Register')
const postSchema = require('../Models/Posts')

async function UpdatePosts({id,coin,quantity,FollowersId},action)
{
  const newPost = new postSchema({
      userId:id,
      action,
      coin,
      FollowersId,
      quantity
  })
  const response = await newPost.save()
  console.log(response)

}

module.exports=UpdatePosts