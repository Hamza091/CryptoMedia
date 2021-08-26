const userSchema = require('../Models/Register')
const Ranking = require('./Ranking')
const UpdatePosts = require('./UpdatePosts')

async function SellCoin(req,res){

    const data = JSON.parse(req.body.userData) 

    await userSchema.updateOne({'_id':data.id},{$set:{
        'amount':data.amount
    }})

    const doc = await userSchema.findOne({'_id':data.id})

        for(let i=0; i<doc.coins.length; i++)
        {
            if(doc.coins[i].name===data.coin)
            {
                doc.coins[i].quantity=doc.coins[i].quantity-parseInt(data.quantity)
                var newQuantity = doc.coins[i].quantity
            }
        }
  
    const UpdatedUser = await doc.save()
    
            Ranking()
            // console.lo("data"+data)
            if(UpdatedUser.followers!==0){
          
                data.followers  = UpdatedUser.followers
                data.FollowersId = UpdatedUser.followersId

                UpdatePosts(data,"sell")
                for(var i=0; i<UpdatedUser.followersId.length; i++)
                {
                    global.io.emit(UpdatedUser.followersId[i].id,{
                        'firstName':UpdatedUser.firstName,
                        'lastName':UpdatedUser.lastName,
                        'action':'sell',
                        'quantity':data.quantity,
                        'coin':data.coin,
                        'time': new Date()
                    })
                }
            }
            res.send({success:true,amount:UpdatedUser.amount,newQuantity})

    

   
}

module.exports=SellCoin