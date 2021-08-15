import {React,useState} from 'react'
import './Css/Register.css'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {LoginAction} from '../redux/actions/LoginAction'
import {UpdatePosts} from '../redux/actions/UpdatePosts'
import socket from '../SocketConfig'

function Login() {

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  
  const history = useHistory()
  const dispatch = useDispatch()
  const loginCredentials = useSelector(state => state.LoginReducer)
  async function handleLogin()
   {
     const json = JSON.stringify({email,password})
      // const json = {email,password}
          try{
            const res = await axios.get('https://cryptomedia.herokuapp.com/api/login',{
             params:{ json }
            
            }
            )
            console.log(res.data)
            if(res.data.success)
            {
              // console.log(loginCredentials)
              socket.on(res.data.data[0]._id,data=>{
                  console.log("check hereer . .. .")
                  console.log(data)
                dispatch(UpdatePosts(data))})
                console.log(res.data)
                const obj = {success:res.data.success,data:res.data.data[0]}
                console.log(obj)
                dispatch(LoginAction(obj))
                history.push("/home")
          
            }
            else
            {
                alert("Invalid Credentials...")
            }

          }
          catch(err)
          {
            console.log(err)
          }
      let labels = document.getElementsByTagName('input')
      for(let i=0; i<labels.length; i++)
          labels[i].value=""
  }
    return (
       
        <div id="login">
             <ul class="tab-group">
        <li class="tab active"><Link to="/">Sign Up</Link></li>
        <li class="tab"><Link to="/login">Log In</Link></li>
      </ul>   
        <h1>Welcome Back!</h1>
   
     <div class="field-wrap">
          <label>
            Email Address<span class="req">*</span>
          </label>
          <input type="email" required autocomplete="off" onChange={e=>{setEmail(e.target.value)}}/>
        </div>
        
        <div class="field-wrap">
          <label>
            Password<span class="req">*</span>
          </label>
          <input type="password" required autocomplete="off" onChange={e=>{setPassword(e.target.value)}}/>
        </div>
        
        <p class="forgot"><a href="#">Forgot Password?</a></p>
        
        <button class="button button-block" onClick={handleLogin}>Log In</button>
        
       </div>

   
    )
}

export default Login
