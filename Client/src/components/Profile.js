import {React} from 'react'
import './Css/Profile.css'
import {useSelector,useDispatch} from 'react-redux'
import {useLocation} from 'react-router-dom'
import axios from 'axios'
import { LoginAction } from '../redux/actions/LoginAction'

function Profile() {
    var loginDetails = useSelector(state => state.LoginReducer)
    const id = loginDetails.data._id
    var show = false
    const location = useLocation()
    const dispatch = useDispatch()
    if(location.details)
    {
        if(id!==location.details.data._id)
                show=true
        loginDetails=location.details
        console.log(loginDetails)
        const followers = loginDetails.data.followersId
        for(let i=0; i<followers.length; i++)
        {
            console.log(id)
            console.log(followers[i].id)
            if(id===followers[i].id)
            {
                show=false
            }
        }
    }
    async function handleClick(){
            const data = JSON.stringify({
                followerId:id, //Person that is sending request to follow 'x'
                userId:loginDetails.data._id // 'x'
            })
            try{
                const response = await axios.post('/api/followreq',{data})
                console.log(response)
                if(response.data.success)
                { 
                    // document.querySelector('.profile-head-buttonContainer').remove()
                    dispatch(LoginAction(response.data))
                }
            }
            catch(err){
                console.log(err)
            }
    }
    return (
        <div className="profile-container">
            
            <div className="profile-head">
                <div className="profile-head-picContainer">
                    <img src={`https://ui-avatars.com/api/?name=${loginDetails.data.firstName}+${loginDetails.data.lastName}`} className="profile-head-pic"/>
                </div>
                <div className="profile-head-details">
                    <p className="profile-p v2">{`${loginDetails.data.firstName} ${loginDetails.data.lastName}`}</p>
                </div>
                {show?
                    <div className="profile-head-buttonContainer">
                        <button className="button-container-invest followbtn" onClick={handleClick}>Follow</button>
                    </div>:null
                }
            </div>
            
            <div className="profile-details">
                <div className="profile-details-info">
                    <h6 className="profile-h6">Full Name</h6>
                    <p className="profile-p">
                        {`${loginDetails.data.firstName} ${loginDetails.data.lastName}`}
                    </p>
                </div>
                <div className="profile-details-info">
                    <h6 className="profile-h6">Followers</h6>
                    <p className="profile-p">
                        {loginDetails.data.followers}
                    </p>
                </div>
                <div className="profile-details-info">
                    <h6 className="profile-h6">Total Amount</h6>
                    <p className="profile-p">
                        {`${loginDetails.data.amount.toFixed(3)}`}
                    </p>
                </div>
                <div className="profile-details-info coin">
                    <h6 className="profile-h6 coinheading">Coins</h6>
                    <div className="coin-details">
                        <h6 className="profile-h6">Bitcoin</h6>
                        <p className="profile-p">
                            {`${loginDetails.data.coins[0].quantity}`}
                        </p>
                    </div>
                    <div className="coin-details">
                        <h6 className="profile-h6">Ethereum</h6>
                        <p className="profile-p">
                            {`${loginDetails.data.coins[1].quantity}`}
                        </p>
                    </div>
                </div>
                
            </div>
        
        </div>
    )
}

export default Profile
