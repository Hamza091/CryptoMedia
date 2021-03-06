import {React,useEffect,useState} from 'react'
import axios from 'axios'
import {useSelector,useDispatch} from 'react-redux'
import './Css/Posts.css'
import {SetPosts} from '../redux/actions/SetPosts'

function Posts() {

    // const [posts,setPosts] = useState([])
    const dispatch = useDispatch()

    var loginCredentials = useSelector(state => state.LoginReducer)
    var posts = useSelector(state => state.PostsReducer)

   useEffect(() => {
        GetPosts()

   }, [])

   async function GetPosts(){

        loginCredentials = JSON.stringify(loginCredentials)
        const response = await axios.get('https://cryptomedia.herokuapp.com/api/posts',{params:{loginCredentials}})
        // setPosts(response.data.filterPosts)
        dispatch(SetPosts(response.data.filterPosts))

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
