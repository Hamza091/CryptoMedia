const express =require('express')
const Register = require('../Controllers/Register')
const Login = require('../Controllers/Login')
const UpdateAmount = require('../Controllers/UpdateAmount')
const SellCoin = require('../Controllers/SellCoin')
const FollowReq = require('../Controllers/FollowReq')
const Posts = require('../Controllers/Posts')

const router = express.Router()
console.log("helllw")

router.post('/register',Register)

router.get('/posts',Posts)

router.get('/login',Login)

router.patch('/updateAmount',UpdateAmount)

router.patch('/SellCoin',SellCoin)

router.post('/followreq',FollowReq)



module.exports=router