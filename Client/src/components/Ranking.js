import {useSelector} from 'react-redux'
import {React,useState} from 'react'
import './Css/Ranking.css'
import {useHistory} from 'react-router-dom'

function Ranking() {
    // http://192.168.0.102:8000
    const history = useHistory()
    const ranks = useSelector(state=>state.UpdateRankingReducer)
    const [rankNumber , setRankNumber]  = useState(1)
    // const socket = socketIOClient("http://127.0.0.1:8000")
    const handleClick = (rank) =>{
        history.push({
            pathname:'/profile',
            details:{
                data:rank
            }
        })
    }
    console.log(ranks)
    return (
        <div className="ranks-container">
            {
                ranks.map((rank,index)=>(
                        <div className="rank" key={rank._id} onClick={()=>handleClick(rank)}>
                            <p className="rank-para">
                            <span className="rank-number">{++index}</span>
                            {rank.firstName} {rank.lastName}</p>
                            <p className="rank-para amount">${rank.amount.toFixed(3)}</p>
                        </div>
                ))
            }
        </div>
    )
}

export default Ranking
