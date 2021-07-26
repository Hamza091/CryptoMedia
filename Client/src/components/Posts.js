import {React,useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import './Css/Posts.css'

// 1st
// io.on('connection',{
//     socket.join(myid)
// })

// io.to(followersidiftheyareconnected).emit('post',newpost)

// 2nd
// socket.emit(followerId,posts)
// socket.on(myid , post)



function Posts() {

    const [posts,setPosts] = useState([])

    var loginCredentials = useSelector(state => state.LoginReducer)

   useEffect(() => {
        GetPosts()
   }, [])

   async function GetPosts(){

        loginCredentials = JSON.stringify(loginCredentials)
        const response = await axios.get('./api/posts',{params:{loginCredentials}})
        setPosts(response.data.filterPosts)

   }

   const formatDate = (date) =>{
        const newdate = new Date(date)
        return newdate.toUTCString()
   }

    return (
        <div className="posts-container">
            {
                posts.map(post=>(<div className="post">
                    <div className="post-head">
                        <div className="profile-head-picContainer postcontainerpic">
                            <img src={`https://ui-avatars.com/api/?name=${post.firstName}+${post.lastName}`} className="profile-head-pic postpic"/>
                        </div>
                        <div className="name-container">
                            <p className="p-posts">{post.firstName} {post.lastName}</p>
                            <p className="p-posts">{formatDate(post.time)}</p>
                        </div>
                    </div>
                    <div className="post-body">
                        <p className="p-posts">{post.firstName} {post.action}s {post.quantity} {post.coin}</p>
                    </div>
                </div>))
            }
        </div>
    )
}

export default Posts
