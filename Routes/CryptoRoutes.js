const express =require('express')
const Register = require('../Controllers/Register')
const Login = require('../Controllers/Login')
const UpdateAmount = require('../Controllers/UpdateAmount')
const SellCoin = require('../Controllers/SellCoin')
const FollowReq = require('../Controllers/FollowReq')
const Posts = require('../Controllers/Login')

const router = express.Router()


router.post('/register',Register)

router.get('/login',Login)

router.patch('/updateAmount',UpdateAmount)

router.patch('/SellCoin',SellCoin)

router.post('/followreq',FollowReq)

router.get('/posts',Posts)

module.exports=router