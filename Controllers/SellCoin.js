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
  
    const updated = await doc.save()

    userSchema.updateOne({'_id':data.id},{$set:{
        'amount':data.amount
    }},(err,response)=>{
        if(err)
        {
            console.log(err)
            res.status(404).send({success:false})
        }
        else
        {
            console.log("response from last update")
            console.log(response)
            Ranking()
            // console.log("data"+data)
            if(data.followers!==0){
                UpdatePosts(data,"sell")
                for(var i=0; i<data.FollowersId.length; i++)
                {
                    global.io.emit(data.FollowersId[i].id,{
                        'firstName':data.firstName,
                        'lastName':data.lastName,
                        'action':'sell',
                        'quantity':data.quantity,
                        'coin':data.coin,
                        'time': new Date()
                    })
                }
            }
            res.send({success:true,amount:data.amount,newQuantity})
        }
    })

   
}

module.exports=SellCoin