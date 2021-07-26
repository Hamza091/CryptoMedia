// const socket = socketIOClient("http://localhost:8000",{
//         withCredentials: true,
//         extraHeaders: {
//           "my-custom-header": "abcd"
//         }})
//         socket.on("ranking",rankings=>{
//           // console.log(rankings)
//             dispatch(UpdateRanking(rankings))
            
//         })
//         if(loginDetails.length>0)
//         {
//         socket.on(loginDetails.data._id,data=>{
//           console.log(data)
//           dispatch(UpdatePosts(data))
//         })
//         }

import openSocket from 'socket.io-client';

const socket = openSocket("http://localhost:8000",{
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd"
    }});

export default socket;