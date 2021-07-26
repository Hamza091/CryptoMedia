const userSchema = require('../Models/Register')
const Ranking = require('./Ranking')
const UpdatePosts = require('./UpdatePosts')

async function UpdateAmount(req,res){
    console.log("Update amount request received...")
    const data = JSON.parse(req.body.userData) 
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
                doc.coins[i].quantity=doc.coins[i].quantity+parseInt(data.quantity)
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
            if(data.followers!==0){
                UpdatePosts(data,"buy")
            }
            res.send({success:true,amount:data.amount,newQuantity})
        }
    })

   
}

module.exports=UpdateAmount