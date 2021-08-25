const { Socket } = require('socket.io')
const userSchema = require('../Models/Register')
// const io = require('../server')
const Ranking = require('./Ranking')
const UpdatePosts = require('./UpdatePosts')

async function SellCoin(req,res){
    console.log("Sell Coin request received...")
    const data = JSON.parse(req.body.userData) 
    console.log("data ")
    console.log(data)

    await userSchema.updateOne({'_id':data.id},{$set:{
        'amount':data.amount
    }})

    const doc = await userSchema.findOne({'_id':data.id})
    console.log(doc)
    
        console.log(doc.coins)
        console.log(doc.coins[0])
        console.log(doc.coins[1])
        for(let i=0; i<doc.coins.length; i++)
        {
            if(doc.coins[i].name===data.coin)
            {
                doc.coins[i].quantity=doc.coins[i].quantity-parseInt(data.quantity)
                var newQuantity = doc.coins[i].quantity
            }
        }
  
    const UpdatedUser = await doc.save()
    
   
    console.log("response from last update")
            console.log(UpdatedUser)
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