const registerSchema = require('../Models/Register')

async function FollowReq(req,res){
    
    const data = JSON.parse(req.body.data)
 
    try{
        const user = await registerSchema.findOne({'_id':data.userId})
        user.followers=user.followers+1
        user.followersId.push({'id':data.followerId})
        await user.save()
        updatedRankData = await registerSchema.find()
        global.io.emit('ranking',updatedRankData)

        res.send({'success':true})
    }
    catch(err)
    {
        console.log(err)
        res.send({'success':false})
    }
}

module.exports=FollowReq