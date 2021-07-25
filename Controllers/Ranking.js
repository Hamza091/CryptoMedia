const userSchema = require('../Models/Register')

async function Ranking()
{
const result = await userSchema.find().sort({"amount":-1})
console.log(result)
global.io.emit('ranking',result)
}

module.exports=Ranking