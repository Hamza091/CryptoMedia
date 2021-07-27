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

}, [])
  return (
    
    <Router>
    
    {!loginDetails.success?

    <div className="App">
      <Switch>
        <Route exact path="/">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </div>
      
      :
     
     <div className="App">
       
       <Nav/>
    
     <Switch>
   
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
      
      </div>}
    
    </Router>
  );
}

export default App;
