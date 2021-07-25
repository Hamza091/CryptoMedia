const registerSchema = require('../Models/Register')

async function Register(req,res){
    console.log("Register request received...")
    const data = JSON.parse(req.body.json) 
    console.log(data)

    const registerUser = new registerSchema({
        firstName:data.firstName,
        lastName:data.lastName,
        email:data.email,
        password:data.password,
        amount:data.amount,
        coins:[{
            name:'bitcoin',
            quantity:0
        },
        {
            name:'ethereum',
            quantity:0
        }],
        followers:0
    })
    // registerUser.save().then((data)=>{
    //     console.log(data)
    //     // res.send({success:true,response:data})
    //     res.send({'success':true,data})
    // }).catch(e=>{
    //     console.log(e)
    //     res.send({success:false})
    // })
   const user = await registerUser.save()
   console.log(user)
   res.send({'success':true,data:user})
    
}

module.exports=Register 