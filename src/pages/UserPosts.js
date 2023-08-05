import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { Card} from 'react-bootstrap';

import { USER_POSTS_ENDPOINT } from '../helpers/endpoints'

import Post from "../components/post/Post"
import Placeholder from '../components/utils/Placeholder'


export default function UserPosts() {
  const [posts, setPosts] = useState([])
  const [fetching, setFetching] = useState(true)

  useEffect(()=>{
    axios.get(USER_POSTS_ENDPOINT)
        .then(response=>{
          setPosts(response.data)
          setFetching(false)

        }).catch(err=>{
          console.log(err)
          setFetching(false)
        })

  },[])
  return (
    <div>
      <Card>
        <h1>Mis Post</h1>

      </Card>
      {fetching &&   <Placeholder></Placeholder>}
      <div>
        {posts.map(post=><Post key={post.postId} 
          post={post} renderControls={true}>

        </Post>)
        }
      </div>
    </div>
  )
}
