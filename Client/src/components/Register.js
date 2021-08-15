import {React,useState} from 'react'
import './Css/Register.css'
import {Link,useHistory} from 'react-router-dom'
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {LoginAction} from '../redux/actions/LoginAction'


function Register() {
   
  const [firstName,setFirstName] = useState('')
   const [lastName,setLastName] = useState('')
   const [email,setEmail] = useState('')
   const [password,setPassword] = useState('')
   const history = useHistory()

   const dispatch = useDispatch()
   const PORT = process.env.PORT || 8000
   async function handleSignup()
   {
     const amount = 100000
     const json = JSON.stringify({firstName,lastName,email,password,amount})
    
          try{
            const res = await axios.post(`https://cryptomedia.herokuapp.com/api/register`,
             { json }
            )
            if(res.data.success)
            {
              console.log(res.data)
                dispatch(LoginAction(res.data))
                history.push("/home")
            }
            else
            {
              alert("Invalid Email...")
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
        <div class="form">
      
      <ul class="tab-group">
        <li class="tab active"><a href="#signup">Sign Up</a></li>
        <li class="tab"><Link to="/login">Log In</Link></li>
      </ul>
      
      <div class="tab-content">
        <div id="signup">   
          <h1>Sign Up</h1>
          
          <div class="top-row">
            <div class="field-wrap">
              <label>
                First Name<span class="req">*</span>
              </label>
              <input type="text" required autocomplete="off" onChange={(e)=>{setFirstName(e.target.value)}}/>
            </div>
        
            <div class="field-wrap">
              <label>
                Last Name<span class="req">*</span>
              </label>
              <input type="text"required autocomplete="off" onChange={(e)=>{setLastName(e.target.value)}}/>
            </div>
          </div>

          <div class="field-wrap">
            <label>
              Email Address<span class="req">*</span>
            </label>
            <input type="email" required autocomplete="off" onChange={(e)=>{setEmail(e.target.value)}}/>
          </div>
          
          <div class="field-wrap">
            <label>
              Set A Password<span class="req">*</span>
            </label>
            <input type="password" required autocomplete="off" onChange={(e)=>{setPassword(e.target.value)}} />
          </div>
          
          <button  class="button button-block" onClick={handleSignup}>Get Started</button>
          
    

        </div>
        
        <div id="login">   
          <h1>Welcome Back!</h1>
          
         
          
            <div class="field-wrap">
            <label>
              Email Address<span class="req">*</span>
            </label>
            <input type="email"required autocomplete="off"/>
          </div>
          
          <div class="field-wrap">
            <label>
              Password<span class="req">*</span>
            </label>
            <input type="password"required autocomplete="off"/>
          </div>
          
          <p class="forgot"><a href="#">Forgot Password?</a></p>
          
          <button class="button button-block">Log In</button>
          
         

        </div>
        
      </div>
      
        </div>
    )
}

export default Register
