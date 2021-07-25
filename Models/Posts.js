const mongoose = require('mongoose')



const postschema = new mongoose.Schema({
    userId:{
        type:'string',
        required:true
    },
    action:{
        type:'string',
        required:true
    },
    coin:{
        type:'string',
        required:true
    },
    FollowersId:{
        type:'array',
        required:true
    },
    quantity:{
        type:'number',
        required:true
    },
    time : { type : Date, default: Date.now }


})

module.exports=mongoose.model('posts', postschema)