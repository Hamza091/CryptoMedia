const userSchema = require('../Models/Register')

async function Login(req,res){

    console.log("Login request received...")
    // console.log(req.query.json.email)
    const data = JSON.parse(req.query.json)
    // const data = req.query.json 
    console.log(data)
    try{
    const user = await userSchema.find({email:data.email,password:data.password})
    // console.log(user)
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
    catch(err)
    {
        console.log(err)
    }

}

module.exports=Login 