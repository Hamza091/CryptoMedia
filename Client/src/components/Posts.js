import {React,useEffect} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'

function Posts() {

    const loginCredentials = useSelector(state => state.loginReducer)

   useEffect(() => {
        GetPosts()
   }, [])

   async function GetPosts(){

        const response = await axios.get('/api/posts',{loginCredentials})
        console.log(response.data)

   }

    return (
        <div>
            hellow
        </div>
    )
}

export default Posts
