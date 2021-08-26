const registerSchema = require('../Models/Register')
const EmailValidator = require('email-deep-validator')
const bcrypt = require('bcrypt')

async function Register(req,res){
    const data = JSON.parse(req.body.json) 

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
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(data.password, saltRounds)
           
            const registerUser = new registerSchema({
                firstName:data.firstName,
                lastName:data.lastName,
                email:data.email,
                password:hashedPassword,
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
        res.send({'success':true,data:user})
        }
    }
    else
    {
        res.send({'success':false})
    }
    
}

module.exports=Register 