const userSchema = require('../Models/Register')
const Ranking = require('./Ranking')
const UpdatePosts = require('./UpdatePosts')

async function UpdateAmount(req,res){
    console.log("Update amount request received...")
    const data = JSON.parse(req.body.userData) 
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
                doc.coins[i].quantity=doc.coins[i].quantity+parseInt(data.quantity)
                var newQuantity = doc.coins[i].quantity
            }
        }
  
    const UpdatedUser = await doc.save()

            console.log("response from last update")
            
            Ranking()
            if(UpdatedUser.followers!==0){
                UpdatePosts(data ,"buy")
                for(var i=0; i<UpdatedUser.followersId.length; i++)
                {
                    global.io.emit(UpdatedUser.followersId[i].id,{
                        'firstName':UpdatedUser.firstName,
                        'lastName':UpdatedUser.lastName,
                        'action':'buy',
                        'quantity':data.quantity,
                        'coin':data.coin,
                        'time': new Date()
                    })
                }
            }
            res.send({success:true,amount:UpdatedUser.amount,newQuantity})

   
}

module.exports=UpdateAmount