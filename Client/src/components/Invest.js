import {React,useState} from 'react'
import './Css/Invest.css'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {UpdateAmount} from '../redux/actions/UpdateAmount'
import {UpdateQuantity} from '../redux/actions/UpdateQuantity'


function Invest() {
    
    const [coinNumbers,setCoinNumbers] = useState(0)
    const loginCredentials = useSelector(state=>state.LoginReducer)
    const dispatch = useDispatch()

    async function handleSell()
    {
        const elem = document.getElementById('slct')
        const coin = elem.value
        if(coin==="Choose an option")
        {
            alert("Please choose a coin to invest...")
        }
        else
        {
            if(coinNumbers>0)
            {
                const coinPrice = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`)
                console.log(coinPrice.data)
                const temp = coinPrice.data
                
                const totalInvestment = (temp[coin].usd)*coinNumbers
                for(let i=0; i<loginCredentials.data.coins.length; i++)
                {
                    if(loginCredentials.data.coins[i].name===coin)
                            var totalCoins = loginCredentials.data.coins[i].quantity
                }
                if(coinNumbers>totalCoins)
                {
                    alert("you Dont have enough coins...")
                } 
                else
                {
                    const newAmount = loginCredentials.data.amount+totalInvestment
                    console.log(loginCredentials)
                    console.log(newAmount)
                    const userData = JSON.stringify({'firstName':loginCredentials.data.firstName,'lastName':loginCredentials.data.lastName,'id':loginCredentials.data._id,'amount':newAmount,'coin':coin,'quantity':coinNumbers, 'FollowersId':loginCredentials.data.followersId, 'followers':loginCredentials.data.followers})
                    console.log(userData)
                    const updateUserAmount = await axios.patch('https://cryptomedia.herokuapp.com/api/SellCoin',{
                        userData
                    })
                    if(updateUserAmount.data.success)
                    {
                        console.log(updateUserAmount)
                        alert("you have successfully sold the coins...")
                        console.log(loginCredentials)
                        let temp = {newAmount,coin}
                        dispatch(UpdateAmount(temp))
                        temp = {coinNumbers:updateUserAmount.data.newQuantity, coin}
                        dispatch(UpdateQuantity(temp))
                        console.log(loginCredentials)
                    }
                }
                console.log(coinPrice)
            }
        }
    }

    async function handleInvest()
    {
        const elem = document.getElementById('slct')
        const coin = elem.value
        if(coin==="Choose an option")
        {
            alert("Please choose a coin to invest...")
        }
        else
        {
            if(coinNumbers>0)
            {
                const coinPrice = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`)
                console.log(coinPrice.data)
                const temp = coinPrice.data
                
                const totalInvestment = (temp[coin].usd)*coinNumbers
                if(totalInvestment>loginCredentials.data.amount)
                {
                    alert("you Dont have enough credits...")
                } 
                else
                {
                    const newAmount = loginCredentials.data.amount-totalInvestment
                    console.log(loginCredentials)
                    console.log(newAmount)
                    const userData = JSON.stringify({'firstName':loginCredentials.data.firstName,'lastName':loginCredentials.data.lastName,'id':loginCredentials.data._id,'amount':newAmount,'coin':coin,'quantity':coinNumbers, 'FollowersId':loginCredentials.data.followersId, 'followers':loginCredentials.data.followers})
                    console.log(userData)
                    const updateUserAmount = await axios.patch('https://cryptomedia.herokuapp.com/updateAmount',{
                        userData
                    })
                    if(updateUserAmount.data.success)
                    {
                        console.log(updateUserAmount)
                        alert("you have successfully bought the coins...")
                        console.log(loginCredentials)
                        let temp = {newAmount,coin}
                        dispatch(UpdateAmount(temp))
                        temp = {coinNumbers:updateUserAmount.data.newQuantity, coin}
                        dispatch(UpdateQuantity(temp))
                        console.log(loginCredentials)
                    }
                }
                console.log(coinPrice)
            }
        }
    }

    return (
        <div className="invest-container">
            <div className="invest-container-head">
                Invest In Crypto
            </div>
            <div class="select">
                <select name="slct" id="slct">
                    <option selected disabled>Choose an option</option>
                    <option value="bitcoin">Bitcoin</option>
                    <option value="ethereum">Ethereum</option>
                </select>
            </div>
                <input type="number" placeholder="Number of coins..." className="coin-input" onChange={(e)=>{setCoinNumbers(e.target.value)}} />
            <div className="button-container-body">
                <button className="button-container-invest" onClick={handleInvest}>Buy</button>
                <button className="button-container-invest" onClick={handleSell}>Sell</button>
            </div>
         
          </div>
      
    )
}

export default Invest
