const userSchema = require('../Models/Register')
const bcrypt = require('bcrypt')

async function Login(req,res){


    const data = JSON.parse(req.query.json)
  
    console.log(data)
    try{
    
    const user = await userSchema.find({email:data.email})
    const match = await bcrypt.compare(data.password,user[0].password)
    if(match){
        res.send({success:true,data:user})
    }
    else{
        res.send({success:false})
    }  
 
    }
    catch(err)
    {
        console.log(err)
    }

}

module.exports=Login 