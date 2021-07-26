import './App.css';
import Nav from './components/Nav'
import Register from './components/Register'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Login'
import Invest from './components/Invest'
import Ranking from './components/Ranking'
import Profile from './components/Profile'
import Posts from './components/Posts'
import {useSelector,useDispatch} from 'react-redux'
import {useEffect} from 'react'
// import socketIOClient from 'socket.io-client'
import {UpdateRanking} from './redux/actions/UpdateRanking'

import socket from './SocketConfig'

function App() {
  const loginDetails =  useSelector(state=>state.LoginReducer)
  
  console.log(loginDetails) 
  const dispatch = useDispatch()
  useEffect(() => {
    socket.on("ranking",rankings=>{
            console.log(rankings)
              dispatch(UpdateRanking(rankings))
  
          })
    // const socket = socketIOClient("http://localhost:8000",{
    //     withCredentials: true,
    //     extraHeaders: {
    //       "my-custom-header": "abcd"
    //     }})
    //     socket.on("ranking",rankings=>{
    //       // console.log(rankings)
    //         dispatch(UpdateRanking(rankings))
            
    //     })
    //     if(loginDetails.length>0)
    //     {
    //     socket.on(loginDetails.data._id,data=>{
    //       console.log(data)
    //       dispatch(UpdatePosts(data))
    //     })
    //     }
}, [])
  return (
    
    <Router>
    <div className="App">
    {loginDetails.success?
       <Nav />:null 
    }
     <Switch>
        <Route exact path="/">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        
        
        <Route path="/home">
          <Posts />
        </Route>

        <Route path="/invest">
          <Invest/>
        </Route>
      
        <Route path="/ranking">
          <Ranking/>
        </Route>

        <Route path="/profile">
          <Profile/>
        </Route>

      </Switch>
    </div>
    </Router>
  );
}

export default App;
