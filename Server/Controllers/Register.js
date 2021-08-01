const registerSchema = require('../Models/Register')
const EmailValidator = require('email-deep-validator')

async function Register(req,res){
    console.log("Register request received...")
    const data = JSON.parse(req.body.json) 
    console.log(data)

    const emailvalidator = new EmailValidator()
    const { wellFormed, validDomain, validMailbox } = await emailvalidator.verify(data.email);

    if(wellFormed&&validDomain&&validMailbox)
    {
        const userexist = await registerSchema.findOne({'email':data.email})
        if(userexist)
        {
            res.send({'success':false})
        }
        else
        {
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
    
        const user = await registerUser.save()
        console.log(user)
        res.send({'success':true,data:user})
        }
    }
    else
    {
        res.send({'success':false})
    }
    
}

module.exports=Register 