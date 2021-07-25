const registerSchema = require('../Models/Register')

async function login(req,res){

    console.log("Login request received...")
    console.log(req.query)
    const data = JSON.parse(req.query.json) 
    console.log(data)
    const user = await registerSchema.find({email:data.email,password:data.password})
    if(user.length>0)
    {
        console.log("found "+ user)
        
        res.send({'success':true,data:user})
        // res.send({data:{...user,'success':true}})
    }
    else
    {
        console.log("user not found")
        res.send({success:false})
    }

}

module.exports=login 