const mongoose = require('mongoose')

const coin = new mongoose.Schema({
    name:{
        type:'string',
        required:true
    },
    quantity:{
        type:'number',
        required:true
    }
})

const followersId = new mongoose.Schema({
    id:{
        type:"string",
        required:true
    }
})

const schema = new mongoose.Schema({

    firstName:{
        type:'string',
        required:true,
    },
    lastName:{
        type:'string',
        required:true
    },
    email:{
        type:'string',
        required:true
    },
    password:{
        type:'string',
        required:true
    },
    amount:{
        type:'number',
        required:true
    },
    coins:[coin],
    followers:{
        type:'number',
        required:false
    },
    followersId:[followersId],
    time : { type : Date, default: Date.now }


})


module.exports= mongoose.model('login',schema)