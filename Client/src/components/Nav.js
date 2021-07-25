import React from 'react'
import './Css/Nav.css'
import {Link} from 'react-router-dom'
import { reset } from 'chalk'

export default function Nav() {
    const hamburgerClicked = () =>{
        let elem=document.querySelectorAll('.nav-container-lists')
        let links = document.querySelector('.nav-container-links')
     

        console.log(elem)
        // document.querySelector('.icon').style.display()
        let st="block"
        if(elem[0].style.display==="block")
                st="none"
        for(let i=0; i<elem.length;i++){
            elem[i].style.display=st
            elem[i].style.margin="0px"
            }
          links.style.position="relative"
          links.style.top="13rem"
          links.style.right="-30px"
          links.style.justifyContent="center"
        //   links.style.backgroundcolor="red"
        //   icon.style.right="2rem"
        
    }
    return (
        <div className="nav-container">
                <p className="nav-container-logo">CryptoMedia</p>
          
            <div className="nav-container-links">
                <p className="nav-container-lists"><Link to="/home" className="nav-container-links new">Home</Link></p>
                <p className="nav-container-lists"><Link to="/invest" className="nav-container-links new">Invest</Link></p>
                <p className="nav-container-lists"><Link to="/ranking" className="nav-container-links new">Ranking</Link></p>
                <p className="nav-container-lists"><Link to="/profile" className="nav-container-links new">Profile</Link></p>
                <p className="nav-container-lists">Logout</p>
              
               
            </div>
            <a href="#" class="icon" onClick={hamburgerClicked}>
                <i class="fa fa-bars"></i>
             </a>
        </div>
    )
}
